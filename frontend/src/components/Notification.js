
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'


const Notification = (props) => {

    const { userLogged, acceptJoinToBoard, rejectJoinToBoard, setNotificationsState, notificationsState, notif } = props


    const sendAcceptNotification = async (idNotif, resp) => {
        let response;
        if (resp) {
            response = await acceptJoinToBoard(idNotif, userLogged)
            var notificationsFiltered = notificationsState.filter(notif => notif != response)
        } else {
            var notificationsFiltered = notificationsState.filter(notif => notif != notif)
            response = await rejectJoinToBoard(idNotif, userLogged)
            // VER SI FUNCIONA
        }
        setNotificationsState(notificationsFiltered)
    }

    return (
        <div style={{ border: 'solid 1px black ', padding: ' 10px' }}>
            <span>Te invitaron a un tablero id:{notif}</span>
            <button onClick={() => sendAcceptNotification(notif, true)}>Aceptar</button>
            <button onClick={() => sendAcceptNotification(notif, false)}>Rechazar</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    acceptJoinToBoard: authActions.acceptJoinToBoard,
    rejectJoinToBoard: authActions.rejectJoinToBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

