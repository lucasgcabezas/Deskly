import axios from 'axios'

const taskPlannerActions = {

    getTaskPlannerFromBoard: (idBoard) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/taskplannerFromBoard/' + idBoard)
                return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },

    deleteTaskPlanner: (idTaskPlanner) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/taskplanner/' + idTaskPlanner)
                return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },

    editTaskPlanner: (idTaskPlanner, title) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/taskplanner/' + idTaskPlanner, { title })
                return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },
    
    addTaskPlanner: (taskPlanner) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/taskplanner', taskPlanner)
                return response.data.response

            } catch (error) {
                console.log(error)
            }
        }
    }

}

export default taskPlannerActions