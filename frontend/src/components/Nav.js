import { NavLink } from 'react-router-dom'
const Nav = () => {
    return (
        <>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/mydesk">MyDesk</NavLink>
            <NavLink to="/sign">Sign</NavLink>
        </>
    )
}
export default Nav