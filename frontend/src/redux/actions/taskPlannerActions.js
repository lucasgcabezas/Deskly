import axios from 'axios'
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
const taskPlannerActions = {

    getTaskPlannerFromBoard: (idBoard) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/taskplannerFromBoard/' + idBoard)
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response
                }
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'An error has occurred on the server, try later!', 'danger')
            }
        }
    },

    deleteTaskPlanner: (idTaskPlanner) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/taskplanner/' + idTaskPlanner)
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response
                }
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'An error has occurred on the server, try later!', 'danger')
            }
        }
    },

    editTaskPlanner: (idTaskPlanner, title) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/taskplanner/' + idTaskPlanner, { title })
                
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response
                }
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'An error has occurred on the server, try later!', 'danger')
            }
        }
    },
    addTaskPlanner: (taskPlanner, token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/taskplanner', taskPlanner , {headers: {
                    'Authorization': 'Bearer ' +token
                }})
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response
                }
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'An error has occurred on the server, try later!', 'danger')
            }
        }
    }
  
}

export default taskPlannerActions