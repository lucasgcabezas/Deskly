import axios from 'axios'
const boardActions = {
    addBoard: (board, token) => {
        try {
            return async(dispatch, getState) => {
                const response = await axios.post('http://localhost:4000/api/board', {board}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                return response.data.respues
            }           
        } catch (error) {
            console.log(error)
        }
    },
    editBoard: (idBoard, contentBoard) => {
        try {
            return async(dispatch, getState) => {
                const response = await axios.put('http://localhost:4000/api/board/' +idBoard, {contentBoard})
                return response.data.respuesta
            }
        } catch (error) {
            console.log(error)
        }
    } 
}

export default boardActions