import axios from 'axios'


const commentActions = {
    
    addComment: (taskId, newComment) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/task/comment/' + taskId, newComment)

                // newComment : {objectId del usuario , nombre del usuario , mensaje}

                return response.data.response.comments // Array de todos los comentarios con el nuevo

            } catch {
                console.log('error en tasks actions ')
            }
        }
    },

    editComment: (taskId, editedComment) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/task/comment/' + taskId, editedComment)

                // editedComment : {id fel comentario , mensaje}

                return response.data.response.comments // Array de todos los comentarios con el editado

            } catch {
                console.log('error en tasks actions ')
            }
        }
    },

    deleteComment: (taskId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/task/comment/' + taskId)
                
                return response.data.response.comments // Array de todos los comentarios si el borrado

            } catch {
                console.log('error en tasks actions ')
            }
        }
    }
}

export default commentActions