import { NavLink } from 'react-router-dom'

import { connect } from "react-redux"
import Nav from "./Nav"
import authActions from '../redux/actions/authActions'



const LateralMenu = (props) => {


    const { userLogged, menuLateral } = props

    let classMenuLateral = menuLateral ? 'lateralMenuOpen' : 'lateralMenuClose'
    // let classElementsMenu = menuLateral ? 'elementsMenuOpen' : 'elementsMenuClose'
    let userFirstName = props.userLogged.response ?`${props.userLogged.response.firstName}`: `${userLogged.firstName} ${userLogged.lastName}`
    let userLastName = props.userLogged.response ? props.userLogged.response.lastName || '' : userLogged.lastName || ''
    let userImg = props.userLogged.response ? props.userLogged.response.img : userLogged.img

    return (
        <div className={classMenuLateral}>
            <span className="fas fa-bars"></span>

            {/* <button onClick={() => setMenuLateral(!menuLateral)}>Open</button> */}
            {/* <div className="menuLateralInfo" style={{ display: menuLateral ? 'flex' : 'none' }}> */}
            <div className="menuLateralInfo" >
                <div className="userPicName">
                    <div className="userPic" style={{ backgroundImage: `url('${userImg}')` }}></div>
                    <span className="userCompleteName">{`${userFirstName} ${userLastName}` }</span>
                </div>
                <div className="navLateral">
                    <NavLink exact to="/" className="link"                         >
                        <span className="material-icons-outlined homeIconMenu">home</span>
                        <span className="linkMenu">Inicio</span>
                    </NavLink>
                    {props.userLogged && <>
                        <NavLink to="/mydesk" className="link">
                            <span className="material-icons-outlined homeIconMenu">dashboard</span>
                            <span className="linkMenu">MyDesk</span>
                        </NavLink>

                        <div className="link logOut" onClick={() => props.signOut()}>
                            <span className="material-icons-outlined homeIconMenu">logout</span>
                            <span className="linkMenu">Log out</span>
                        </div></>}
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    signOut: authActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(LateralMenu)