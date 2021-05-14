import { useState } from "react"
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import { connect } from "react-redux"
import authActions from '../redux/actions/authActions'
import GoogleLogin from 'react-google-login'
import { NavLink } from 'react-router-dom'
// import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login';

const SignUp = (props) => {
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', img: '' })
    const [eye, setEye] = useState(false)
    const [mistakes, setMistakes] = useState({ firstName: '', lastName: '', email: '', password: '', img: '' })

    const readInputUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sendValueUser = async (e = null, googleUser = null, userFacebook = null) => {
        setMistakes({ firstName: '', lastName: '', email: '', password: '', img: '' })
        e && e.preventDefault()
        let userGen = e ? user : googleUser || userFacebook

        // if(Object.values(userGen).some(value => value === "")){
        // return toast.error('Fill in the fields')
        // }
        const response = await props.signUpUser(userGen)
        if (response) {
            alert(response)
            if (response.controllers) {
                // if(response.controllers === "There was an error in the user engraving. Retry"){
                // return toast.error(response.controllers)
                // }
                return setMistakes({ 'email': response.controllers })
            }
            // response.map(error => setMistakes((prevState) => {
            //     return { ...prevState, [error.context.label]: error.message }
            // }))
        }
        // else{
        //     toast.success(`Welcome ${userGen.firstName}`)
        //     setTimeout(function(){ props.history.push('/') }, 5000);

        // }
    }
    const responseGoogle = (response) => {
        const { givenName, familyName, email, googleId, imageUrl } = response.profileObj
        sendValueUser(null, { firstName: givenName, lastName: familyName, email, password: "a" + googleId, img: imageUrl, google: true })
    }
    const responseFacebook = (response) => {
        const {name, email, id, picture} = response
        sendValueUser(null, {firstName: name, lastName:null, email, password: "a"+ id, img: picture.data.url, facebook:true})
    }

    return (
        <>
            <div>
                <div>
                    <h1>Sign up!</h1>
                    <form>
                        <input type="text" placeholder="Please, enter your first name"
                            onChange={readInputUser} value={user.firstName} name="firstName" />
                        {mistakes.firstName ? <h6>{mistakes.firstName}</h6> : null}
                        <input type="text" placeholder="Please, enter your last name"
                            onChange={readInputUser} value={user.lastName} name="lastName" />
                        {mistakes.lastName ? <h6>{mistakes.lastName}</h6> : null}
                        <input type="text" placeholder="Please, enter your email adress"
                            onChange={readInputUser} value={user.email} name="email" />
                        {mistakes.email ? <h6>{mistakes.email}</h6> : null}
                        <div className="password">
                            <input type={eye ? "text" : "password"} placeholder="Please, enter your password"
                                onChange={readInputUser} value={user.password} name="password" />
                            {/* {eye ? <VisibilityOffOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)}/>} */}
                        </div>
                        {mistakes.password ? <h6>{mistakes.password}</h6> : null}
                        <input type="text" className="input image" placeholder="Please, enter the URL of your picture"
                            onChange={readInputUser} value={user.img} name="img" />
                        {mistakes.img ? <h6>{mistakes.img}</h6> : null}
                        <button className="boton" onClick={sendValueUser}>Sign up!</button>
                        <div >
                            <h6>Already have an account?  <NavLink to='/signin' className="navLink sign">Sign in here!</NavLink></h6>
                            <h6>Or you can sign up with Google</h6>
                        </div>
                        <GoogleLogin
                            clientId="81825591921-124e4vl2b4i29jpfrf8k1vpnj84qb0fq.apps.googleusercontent.com"
                            // render={renderProps => (
                            //     <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign up with Google</GoogleButton>
                            // )}
                            buttonText="Sign up with google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <FacebookLogin
                            appId="525627921786555"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            textButton="Sign Up with Facebook"
                            icon="fa-facebook"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    signUpUser: authActions.signUpUser

}

export default connect(null, mapDispatchToProps)(SignUp)