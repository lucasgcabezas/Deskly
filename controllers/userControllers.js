const User = require ("../models/UserModel")
const bcryptjs = require ("bcryptjs")
const jwt = require("jsonwebtoken")


const userControllers={
    newUser: async (req, res) => {
        var error
        var {firstName,lastName,email,img,role,password,google} = req.body 
        try {
            const emailExist = await User.findOne({email})  
            if (!emailExist) {
                try {
                    const passwordHashed= bcryptjs.hashSync(password,10)
                    var response = new User({firstName,lastName,email,img,role,google,password: passwordHashed})  
                    await response.save() 
                    var token = jwt.sign({...response},process.env.SECRET_KEY)
                } catch (e){
                    error = "Hubo un error en el grabado del usuario. Intenta nuevamente"
                }                  
            } else {
                error = "El email ya esta en uso"
            } 
        } catch (e) {
            error = "No se pudo acceder a la base de usuario. Intenta nuevamente"
        }
        if(error){
            
            return res.json({success: false, error})
        }
        
        res.json({success:true, token, response})   
    },

    login:async (req,res)=>{
        
         //    agregar google al array
        const {email, password} = req.body
        var google = false
        console.log(email, password, google)
        var response;
        var error;
        try{ 
            const userOK = await User.findOne({email: email})
            if (userOK) {
                if (userOK.google === google ){                   
                    const passwordOk = bcryptjs.compareSync(password, userOK.password)
                    if (passwordOk) {
                        const token = jwt.sign({...userOK}, process.env.SECRET_KEY)
                        response ={token: token, firstName:userOK.firstName, lastName:userOK.lastName, email:userOK.email, img:userOK.img, role: userOK.role, goolge: userOK,google }
                    } else {
                        error = "El usuario y/o la contraseña es incorrecta"
                    }
                } else {
                    error = "Estas intentado ingresar desde un lugar erroneo. Intenta nuevamente"
                }           
            } else {
                error = "El usuario y/o la contraseña es incorrecta"
            }
        } catch(e) {
            error = "No se pudo acceder a la base de usuario. Intenta nuevamente"
        }
        res.json({success: !error ? true : false, response, error})
    },
    reLogin: (req, res) => {
        
          res.json({
          success: true, 
          response: {firstName: req.user.firstName, email: req.user.email, img: req.user.img, role: req.user.role }
    })
    },
    existUser : async (req, res) => {
        console.log(req.params.email)
        const userOK = await User.findOne({email: req.params.email})
        console.log(userOK)
        res.json({success: userOK ? true : false})
    }

}

module.exports = userControllers


