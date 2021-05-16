import React, { useState } from "react"
import { connect } from "react-redux"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'


const SignIn = (props) => {
    const {userLogged} = props
    const [logIn, setLogIn] = useState({})

    const input = e => {
        var value = e.target.value
        var prop = e.target.name
        setLogIn({
            ...logIn,
            [prop]: value,
            google: false,
            facebook: false,
        })
    }

    const log = async (e = null, googleUser = null, userFacebook = null) => {
        e && e.preventDefault()
        let user = e ? logIn : googleUser || userFacebook
        if (!user.email || !user.password) {
            alert("Please complete all fields")
            return false
        }
        props.logIn(user)
    }

    const respuestaGoogle = (response) => {
        const { email, googleId } = response.profileObj
        log(null, { email: email, password: 'Aa' + googleId, google: true })
    }

    const responseFacebook = (response) => {
        const {email, id} = response
        log(null, {email, password: "Aa"+ id, facebook: true})
    }

    return (
        
        <div>
       
            <h1>hola {userLogged ? userLogged.firstName : "nadie"}</h1>
            <input type="text" name="email" placeholder="e-mail" onChange={input} />
            <input type="password" name="password" placeholder="Password" onChange={input} />
            <button onClick={log} > <h2>Send</h2></button>
            <GoogleLogin className="botonSignUp2"
                clientId="81825591921-124e4vl2b4i29jpfrf8k1vpnj84qb0fq.apps.googleusercontent.com"
                buttonText="Sign In with Google"
                onSuccess={respuestaGoogle}
                onFailure={respuestaGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="525627921786555"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Log In with Facebook"
                icon="fa-facebook"
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    logIn: authActions.signInUSer
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
