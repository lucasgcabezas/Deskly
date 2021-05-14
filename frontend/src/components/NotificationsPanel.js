
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'
import Notification from './Notification'


const NotificationsPanel = (props) => {

    const { userLogged, checkNotifications } = props
    const [notificationsState, setNotificationsState] = useState([])

    useEffect(() => {
        activeCheckNotifications()
        const reloadNotifications = setInterval(() => {
            activeCheckNotifications()
        }, 4000)
        return () => { clearInterval(reloadNotifications) }
    }, [])

    const activeCheckNotifications = async () => {
        if (props.userLogged) {
            const response = await checkNotifications(userLogged)
            setNotificationsState(response)
        }
    }

    return (
        <div>
            {
                notificationsState.length > 0
                && notificationsState.map((notif, i) => {
                    return <Notification key={i} notif={notif} setNotificationsState={setNotificationsState} notificationsState={notificationsState} />
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    checkNotifications: authActions.checkNotifications,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPanel)

