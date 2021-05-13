import React, {useState} from "react"
import {connect} from "react-redux"
import authActions from "../redux/actions/authActions"



const SignIn = (props) =>{
    const [logIn, setLogIn] = useState({})
    const [nombre,setNombre] = useState("desconocido")
    const input = e => {
        var value = e.target.value
        var prop = e.target.name
        setLogIn({
            ...logIn,
            [prop]: value
        })
    }

    const  log = async () => {
        // Agregar googleFlag
        props.logIn(logIn, false)
    }

    return (
       
        <div><>
            <h1>hola {props.userLogged?props.userLogged.firstName:"nadie"}</h1>         
            <input type="text" name="email" placeholder="e-mail" onChange={input}/>
            <input type="password" name="password" placeholder="Password" onChange={input}/>
            <button  onClick={log} > <h2>Send</h2></button> 
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
