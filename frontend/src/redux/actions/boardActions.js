import axios from "axios"

const boardActions = {
    deleteBoard: (id) => {
        return async (dispatch, getState) => {
            try {
            const response = await axios.delete("http://localhost:4000/api/board/" +id.idBoard)
            } catch {
            alert('Error','Internal server error, please try later!', 'danger')
            }

        }
    },
    addBoard: (title, description,  token) => {    
        try {
            return async (dispatch, getState) => {
                const response = await axios.post('http://localhost:4000/api/board', { title,description}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                return response.data.respuesta
            }           
        } catch (error) {
            console.log(error)
        }
    },
    editBoard:(id, description) => {
        try {
            return async (dispatch, getState) => {
                const response = await axios.put("http://localhost:4000/api/board/" +id.idBoard, {description})
                return response.data.respuesta
            }
        } catch (error) {
            console.log(error)
        }
    },
    getBoards: (token) => {
        return async (dispatch, getState) => {
            const response = await axios.get("http://localhost:4000/api/board" , {headers: {
                'Authorization': 'Bearer ' + token
            }})
            dispatch({type:'GET_BOARDS', payload:response.data.response})
        }
    },
}


export default boardActions

