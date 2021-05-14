import { NavLink } from 'react-router-dom'
import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'
const Nav = (props) => {
    return (
        <>
            <NavLink exact to="/">Home</NavLink>
          {props.userLogged && <>
                <NavLink to="/mydesk">MyDesk</NavLink>
                <button onClick={()=>props.signOut()}> Log out</button></>}
           {!props.userLogged && <>
                <NavLink to="/sign">Sign</NavLink>
                <NavLink to="/signup">Sign Up</NavLink></>}
        </>
    )
}

const mapStateToProps= state =>{
    return{ 
        userLogged: state.authReducer.userLogged,
    }
}
const mapDispatchToProps = {
    signOut: authActions.signOut
}

export default connect(mapStateToProps,  mapDispatchToProps)(Nav)