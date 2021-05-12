import React, {useState} from "react"
import {connect} from "react-redux"
import authActions from "../redux/actions/authActions"



const SignIn = (props) =>{
    const [logIn, setLogIn] = useState({})

    const input = e => {
        var value = e.target.value
        var prop = e.target.name
        setLogIn({
            ...logIn,
            [prop]: value
        })
    }

    const  log = async () => {
        const googleFlag = false
        props.logIn(logIn,googleFlag)
    }

    return (
        <div>         
            <input type="text" name="email" placeholder="e-mail" onChange={input}/>
            <input type="password" name="password" placeholder="Password" onChange={input}/>
            <button  onClick={log} > <h2>Send</h2></button>    
        </div>
    )
}
const mapStateToProps= state =>{
    return{ 
      }
}

const mapDispatchToProps= {   
    logIn: authActions.signInUSer
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
