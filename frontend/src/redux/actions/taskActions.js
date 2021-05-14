import axios from 'axios'


const taskActions = {
    tasksFromTaskplanner: (taskPlannerId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/task/' + taskPlannerId)
                return response.data.response // Array de tasks segun el id del taskPlanner

            } catch {
                console.log('error en tasks actions ')
            }
        }
    },

    addTask: (taskToAdd , token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/task', taskToAdd, {headers: {
                    'Authorization': 'Bearer ' +token
                }})
                return response.data.response // Object que contiene solo la task agregada

            } catch {
                console.log('error en tasks actions ')
            }
        }
    },

    editTask: (taskEditId, taskEdit) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/task/' + taskEditId, taskEdit)
                return response.data.response // Object que contiene solo la task editada
            } catch {
                console.log('error en tasks actions ')
            }
        }
    },

    deleteTask: (taskEditId, taskEdit) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/task/' + taskEditId)
                return response.data.response // Object que contiene solo la task eliminada

            } catch {
                console.log('error en tasks actions ')
            }
        }
    }
}

export default taskActions