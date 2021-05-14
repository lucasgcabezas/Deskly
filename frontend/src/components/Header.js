
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import authActions from '../redux/actions/authActions'


const Header = (props) => {

    const { userLogged, checkNotifications, acceptJoinToBoard } = props

    useEffect(() => { activeCheckNotifications() }, [props])
    
    const [notificationsState, setNotificationsState] = useState([])

    const activeCheckNotifications = async () => {
        if (props.userLogged) {
            const response = await checkNotifications(userLogged)
            setNotificationsState(response)
        }
    }

    const sendAcceptNotification = async (idNotif) => {
        const response = await acceptJoinToBoard(idNotif, userLogged)
        let notificationsFiltered = notificationsState.filter(notif => notif != response)
        setNotificationsState(notificationsFiltered)
    }

    return (
        <>
            <Nav />
            <div>
                {
                    notificationsState.length > 0
                    && notificationsState.map((notif, i) => {
                        return (
                            <div key={i} style={{ border: 'solid 1px black ', padding: ' 10px' }}>
                                <span>Te invitaron a un tablero id:{notif}</span>
                                <button onClick={() => sendAcceptNotification(notif)}>Aceptar</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    checkNotifications: authActions.checkNotifications,
    acceptJoinToBoard: authActions.acceptJoinToBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

