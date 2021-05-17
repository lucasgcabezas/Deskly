// import Header from '../components/Header';
import { useState } from 'react'
import LogIn from '../components/LogIn'
import SignUp from './SignUp'
const Sign = () => {



    const [buttonSign, setButtonSign] = useState(true)
    const [buttonanimation, setbuttonanimation] = useState()

    let classFormSign = buttonSign ? 'signHeroRegistrar' : 'signHeroIniciarSesion'
    let classFormSign2 = buttonanimation === false ? 'signHeroRegistrarAnimation' : buttonanimation === true && 'signHeroIniciarSesionAnimation'

    const changeStatesButtons = (section) => {
        setButtonSign(!buttonSign)
        if (section === 'in') {
            setbuttonanimation(false)
        } else {
            setbuttonanimation(true)
        }
    }




    return (
        <>
            {/* <Header/> */}
            <div className="contenedorSign">
                <div className={`${classFormSign} ${classFormSign2}  `}>
                    {/* <button onClick={() => setButtonSign(!buttonSign)}   >Toca</button> */}

                    {
                        buttonSign
                            ? <div className={"contenedorHeroLogIn"}>
                                <div className="logoFooter">
                                    <div className="desklyLogoSign" style={{ backgroundImage: "url('/assets/DesklyLogo2.png')" }}></div>
                                    <h1>DESKLY</h1>
                                </div>
                                <div className="infoRegister">
                                    <h2>Already have an account?</h2>
                                    <button className="buttonSignUp" onClick={() => changeStatesButtons('in')}>Log in here!</button>
                                </div>
                            </div>
                            : <div className="contenedorHeroLogIn">
                                <div className="logoFooter">
                                    <div className="desklyLogoSign" style={{ backgroundImage: "url('/assets/DesklyLogo2.png')" }}></div>
                                    <h1>DESKLY</h1>
                                </div>
                                <div className="infoRegister">
                                    <h2> Dont have an account yet?</h2>
                                    <button className="buttonSignUp" onClick={() => changeStatesButtons('up')}>Register here!</button>
                                </div>
                            </div>
                    }


                </div>
                <SignUp buttonanimation={buttonanimation} />
                <LogIn buttonanimation={buttonanimation} />
            </div>
        </>
    )
}

export default Sign;