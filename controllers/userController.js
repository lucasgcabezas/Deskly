const User = require ("../models/User")
const bcryptjs = require ("bcryptjs")
const jwt = require("jsonwebtoken")


const userControllers={
    newUser: async (req, res) => {
        var error
        var {firstName,lastName,email,img,role,password} = req.body 
        try {
            const emailExist = await User.findOne({email})  
            if (!emailExist) {
                try {
                    const passwordHashed= bcryptjs.hashSync(password,10)
                    var newUserToAdd = new User ({firstName,lastName,email,img,role,password: passwordHashed})  
                    var newUserSaved = await newUserToAdd.save() 
                    const token = jwt.sign({...newUserSaved},process.env.SECRET_KEY)
                    var response = token
                } catch (e){
                    error = "Hubo un error en el grabado del usuario. Reintente"
                }                  
            } else {
                error = "El email ya esta en uso"
            } 
        } catch (e) {
            error = "No se pudo acceder a la base de usuario. Reintente"
        }

       res.json({
        success: !error ? true : false,
        response: {token: response, name:newUserSaved.firstName, lastName:newUserSaved.lastName, email:newUserSaved.email, img:newUserSaved.img, role: newUserSaved.role },
        error: error
    })   
    },

    login:async (req,res)=>{
        const {email, password} = req.body
        var response;
        var error;
        try{ 
            const userOK = await User.findOne({email: email})
            if (userOK) {
                const passwordOk = bcryptjs.compareSync(password, userOK.password)
                if (passwordOk) {
                    const token = jwt.sign({...userOK}, process.env.SECRET_KEY)
                    response = token
                } else {
                    error = "El usuario y/o la contraseña es incorrecta"
                }           
            } else {
                error = "El usuario y/o la contraseña es incorrecta"
            }
        } catch(e) {
            error = "No se pudo acceder a la base de usuario. Reintente"
        }
      
        res.json({
            success: !error ? true : false,
            response: !error && {token: response, name:userOK.firstName, email:userOK.email, img:userOK.img, role: userOK.role },
            error: error
        })
    },
    reLogin: (req, res) => {
          res.json({
          success: true, 
          response: {name: req.user.firstName, email: req.user.email, img: req.user.img, role: req.user.role }
    })
    },

}

module.exports = userControllers