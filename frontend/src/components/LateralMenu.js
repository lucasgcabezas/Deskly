import { NavLink } from 'react-router-dom'

import { connect } from "react-redux"
import Nav from "./Nav"
import authActions from '../redux/actions/authActions'



const LateralMenu = (props) => {


    const { userLogged, menuLateral } = props

    let classMenuLateral = menuLateral ? 'lateralMenuOpen' : 'lateralMenuClose'
    // let classElementsMenu = menuLateral ? 'elementsMenuOpen' : 'elementsMenuClose'

    return (
        <div className={classMenuLateral}>
            <span className="fas fa-bars"></span>

            {/* <button onClick={() => setMenuLateral(!menuLateral)}>Open</button> */}


            {/* <div className="menuLateralInfo" style={{ display: menuLateral ? 'flex' : 'none' }}> */}
            <div className="menuLateralInfo" >
                <div className="userPicName">
                    <div className="userPic" style={{ backgroundImage: `url('${userLogged.img}')` }}></div>
                    <span className="userCompleteName">{userLogged.firstName + ' ' + (userLogged.lastName || '')}</span>
                </div>
                <div className="navLateral">
                    <NavLink exact to="/" className="link"                         >
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