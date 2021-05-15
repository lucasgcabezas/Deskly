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
const taskActions = {
    tasksFromTaskplanner: (taskPlannerId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/task/' + taskPlannerId)
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response // Array de tasks segun el id del taskPlanner
                }
            } catch (error){
                console.log(error)
                desklyAlert('Error', 'Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            }
        }
    },

    addTask: (taskToAdd , token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/task', taskToAdd, {headers: {
                    'Authorization': 'Bearer ' + token
                }})
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response // Array de tasks segun el id del taskPlanner
                }            
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            }
        }
    },

    editTask: (taskEditId, taskEdit) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/task/' + taskEditId, taskEdit)
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response // Array de tasks segun el id del taskPlanner
                }            
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            }
        }
    },

    deleteTask: (taskEditId, taskEdit) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/task/' + taskEditId)
                if (!response.data.success) {
                    desklyAlert('Error', response.data.response, 'danger')
                } else {
                    return response.data.response // Array de tasks segun el id del taskPlanner
                }
            } catch (error) {
                console.log(error)
                desklyAlert('Error', 'Ha ocurrido un error en el servidor, intente más tarde!', 'danger')
            }
        }
    }
}

export default taskActions