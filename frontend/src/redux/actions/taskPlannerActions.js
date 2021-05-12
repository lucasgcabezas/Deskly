import axios from 'axios'

const taskPlannerActions = {

    getTaskPlannerFromBoard: (idBoard) => {
        console.log(idBoard)
        return async (dispatch, getState) => {
            try{
                const response = await axios.get('http://localhost:4000/api/taskplannerFromBoard/'+idBoard)
                console.log(response)
                return response.data.response
            }catch(error){
                console.log(error)
            }
        }
    },
    deleteTaskPlanner: (idTaskPlanner) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.delete('http://localhost:4000/api/taskplanner/'+idTaskPlanner)
                return response.data.response
            }catch(error){
                console.log(error)
            }
        }
    },
    editTaskPlanner: (idTaskPlanner, title) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.put('http://localhost:4000/api/taskplannerFromBoard/'+idTaskPlanner, {title})
                return response.data.response
            }catch(error){
                console.log(error)
            }
        }
    },
    addTaskPlanner: (taskPlanner) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/task', taskPlanner)
                return response.data.response 

            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default taskPlannerActions