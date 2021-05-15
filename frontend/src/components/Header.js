import Nav from '../components/Nav'
import NotificationsPanel from './NotificationsPanel'
const Header = () => {
    return (
        <div className="contenedorHeader">
            <Nav />
            <NotificationsPanel />
            <div class="semicirculo"></div>
        </div>
    )
}

export default Header

