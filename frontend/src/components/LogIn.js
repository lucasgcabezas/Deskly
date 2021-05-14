import React, {useState} from "react"
import {connect} from "react-redux"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'



const SignIn = (props) =>{
    const [logIn, setLogIn] = useState({})
    const [nombre,setNombre] = useState("desconocido")
    const input = e => {
        var value = e.target.value
        var prop = e.target.name
        setLogIn({
            ...logIn,
            [prop]: value,
            google: false
        })
    }

    // const  log = async () => {
     
    //     props.logIn(logIn)
    // }

    const  log = async (e = null, userGoogle = null) => {
        e && e.preventDefault()  
        console.log(e,userGoogle)
           
        let user = e ? logIn : userGoogle
        console.log(user)
        if( !user.email || !user.password ) {
           alert("Please complete all fields" )
            return false           
        } 
        props.logIn(user)
    }

    const respuestaGoogle = (response) => { 
        console.log(response.profileObj)
        if (response.profileObj.email) {
            log(null, {email: response.profileObj.email, password: 'a'+response.profileObj.googleId,google:true})
         alert("Bienvenido a Deskly")
        } else {
            alert("Something is wrong. Try again later" )
        }
    }

    return (
       
        <div><>
            <h1>hola {props.userLogged?props.userLogged.firstName:"nadie"}</h1>         
            <input type="text" name="email" placeholder="e-mail" onChange={input}/>
            <input type="password" name="password" placeholder="Password" onChange={input}/>
            <button  onClick={log} > <h2>Send</h2></button> 
            <GoogleLogin className="botonSignUp2"
                clientId="81825591921-124e4vl2b4i29jpfrf8k1vpnj84qb0fq.apps.googleusercontent.com"
                buttonText="Sign In with Google"
                onSuccess={respuestaGoogle}
                onFailure={respuestaGoogle}
                cookiePolicy={'single_host_origin'}
                />
            </>   
        </div>
    )
}
const mapStateToProps= state =>{
    return{ 
        userLogged: state.authReducer.userLogged,
      }
}

const mapDispatchToProps= {   
    logIn: authActions.signInUSer
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
