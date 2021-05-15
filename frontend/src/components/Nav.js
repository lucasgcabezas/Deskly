import { NavLink } from 'react-router-dom'
import { connect } from "react-redux"
import authActions from '../redux/actions/authActions'
const Nav = (props) => {
    return (
        <>
            <NavLink exact to="/" className="link">Home</NavLink>
            {props.userLogged && <>
                <NavLink to="/mydesk" className="link">MyDesk</NavLink>
                <span className="link logOut" onClick={() => props.signOut()}> Log out</span></>}
            {!props.userLogged && <>

                <NavLink to="/sign" className="link">Sign</NavLink>
                <NavLink to="/signup" className="link"> Sign Up</NavLink>
            </>}
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)