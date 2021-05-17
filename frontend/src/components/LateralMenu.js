import { NavLink } from 'react-router-dom'

import { connect } from "react-redux"
import Nav from "./Nav"
import authActions from '../redux/actions/authActions'
import NotificationsPanel from './NotificationsPanel'
import {useEffect, useState } from 'react'



const LateralMenu = (props) => {


    const { userLogged, menuLateral, checkNotifications } = props

    const [notifButton, setNotifButton] = useState(false)
    const [notificationsState, setNotificationsState] = useState([])
    useEffect(() => {
        activeCheckNotifications()
        const reloadNotifications = setInterval(() => {
            activeCheckNotifications()
        }, 4000)
        return () => { clearInterval(reloadNotifications) }
    },[])
    let classMenuLateral = menuLateral ? 'lateralMenuOpen' : 'lateralMenuClose'
    // let classElementsMenu = menuLateral ? 'elementsMenuOpen' : 'elementsMenuClose'

    const activeCheckNotifications = async () => {
        if (userLogged) {
            const response = await checkNotifications(userLogged)
            if (response) {
                setNotificationsState(response)
            }
        }
    }

    return (
        <div className="menu" >

            <div className={classMenuLateral}>
                <span className="fas fa-bars"></span>

                {/* <button onClick={() => setMenuLateral(!menuLateral)}>Open</button> */}

                <h1>{notificationsState.length}</h1>
                {/* <div className="menuLateralInfo" style={{ display: menuLateral ? 'flex' : 'none' }}> */}
                <div className="menuLateralInfo" >

                    <div className="navLateral">

                        <NavLink exact to="/" className="link linkDeskly">
                            <div className="logoMenuLateral" style={{ backgroundImage: `url('/assets/DesklyLogo2.png')` }} ></div>
                            <span className="linkMenu menuLateralDeskly">DESKLY</span>
                        </NavLink>

                        <div className="link" onClick={() => setNotifButton(!notifButton)}>
                            <span className="material-icons-outlined homeIconMenu" >notifications</span>
                            <span className="linkMenu">Notifications</span>
                        </div>

                        <NavLink exact to="/" className="link">
                            <span className="material-icons-outlined homeIconMenu">home</span>
                            <span className="linkMenu">Home</span>
                        </NavLink>
                        {props.userLogged && <>
                            <NavLink to="/mydesk" className="link">
                                <span className="material-icons-outlined homeIconMenu">dashboard</span>
                                <span className="linkMenu">MyDesk</span>
                            </NavLink>



                            <div className="link logOut" onClick={() => props.signOut()}>
                                <span className="material-icons-outlined homeIconMenu">logout</span>
                                <span className="linkMenu">Log Out</span>
                            </div></>}
                    </div>
                </div>
            </div>
            <NotificationsPanel setNotifButton={setNotifButton} notifButton={notifButton} />

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    signOut: authActions.signOut,
    checkNotifications: authActions.checkNotifications,

}

export default connect(mapStateToProps, mapDispatchToProps)(LateralMenu)