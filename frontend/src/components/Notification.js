
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'


const Notification = (props) => {

    const { userLogged, acceptJoinToBoard, rejectJoinToBoard, setNotificationsState, notificationsState, notif } = props


    const sendAcceptNotification = async (idNotif, resp) => {
        let response;
        if (resp) {
            response = await acceptJoinToBoard(idNotif, userLogged)
            console.log(response)
            var notificationsFiltered = notificationsState.filter(notif => notif._id != response)
        } else {
            var notificationsFiltered = notificationsState.filter(notif => notif._id != notif)
            response = await rejectJoinToBoard(idNotif, userLogged)
            // VER SI FUNCIONA
        }
        console.log(notificationsFiltered)
        setNotificationsState(notificationsFiltered)
    }
    return (
        <div style={{ border: 'solid 1px black ', padding: ' 10px' }}>
            <span>Tienes una invitación al tablero "{notif.title}" de {notif.owner.firstName + ' ' + notif.owner.lastName} </span>
            <button onClick={() => sendAcceptNotification(notif._id, true)}>Aceptar</button>
            <button onClick={() => sendAcceptNotification(notif._id, false)}>Rechazar</button>
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

