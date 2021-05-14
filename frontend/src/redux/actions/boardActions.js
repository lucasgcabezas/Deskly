import axios from "axios"
import { store } from 'react-notifications-component'
const desklyAlert = async (alertTitle, alertMessage, alertType) => {
    await store.addNotification({
        title: alertTitle,
        message: alertMessage,
        type: alertType,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__flipInX"],
        animationOut: ["animate__animated", "animate__fadeOutDown"],
        dismiss: { duration: 3000, onScreen: true, pauseOnHover: true, showIcon: true }
    })
}
const boardActions = {
    deleteBoard: (id,token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete("http://localhost:4000/api/board/" + id, {headers: {
                    'Authorization': 'Bearer ' + token
                }})
                if (!response.data.success) {
                    desklyAlert('Oops', response.data.error, 'danger')
                } else {
                    dispatch({type: 'DELETE_BOARDS', payload:response.data.response._id})
                }
            } catch (error){
                desklyAlert('Error','Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
                console.log(error)
            }
        }
    },
    addBoard: (board) => {
        const { title, description, token } = board
        try {
            return async (dispatch, getState) => {
                const response = await axios.post('http://localhost:4000/api/board', { title, description }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (!response.data.success) {
                    desklyAlert('Oops', response.data.error, 'danger')
                } else {
                    dispatch({ type: 'ADD_BOARDS', payload: response.data.response })
                }
            }
        } catch (error) {
            desklyAlert('Error','Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            console.log(error)
        }
    },
    editBoard:(id, updateInput, token) => {
        const {title, description} = updateInput
        try {
            return async (dispatch, getState) => {
                const response = await axios.put("http://localhost:4000/api/board/" + id, {title, description} ,{headers: {
                    'Authorization': 'Bearer ' + token
                }})
                if (!response.data.success) {
                    desklyAlert('Oops', response.data.error, 'danger')
                } else {
                    return response.data.response
                }
            }
        } catch (error) {
            desklyAlert('Error','Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            console.log(error)
        }
    },
    getBoardsFromUser: (token) => {
        try {
            return async (dispatch, getState) => {
                const response = await axios.get("http://localhost:4000/api/board", {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (!response.data.success) {
                    desklyAlert('Oops', response.data.error, 'danger')
                } else {
                    dispatch({ type: 'GET_BOARDS', payload: response.data.response })
                }
            }
        } catch (error) {
            desklyAlert('Error','Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            console.log(error)
        }
    },
    getUsersFromBoard: (idBoard) => {
        try {
            return async (dispatch, getState) => {
                const response = await axios.get("http://localhost:4000/api/board/" +idBoard)
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.users
                }
            }
        } catch (error) {
            desklyAlert('Error','Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            console.log(error)
        }
    },
}

export default boardActions