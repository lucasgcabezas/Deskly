import axios from 'axios'


const commentActions = {
    getComments: (taskId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/task/comment/' + taskId)
                return response.data.response.comments // Array de todos los comentarios con el nuevo
            } catch (error) {
                console.log('error en tasks actions ', error)
            }
        }
    },

    addComment: (taskId, newComment, userToken) => {
        return async (dispatch, getState) => {
            try {
                console.log(taskId, newComment);
                const response = await axios.post('http://localhost:4000/api/task/comment/' + taskId, newComment, {
                    headers: { 'Authorization': 'Bearer ' + userToken }
                })
                // newComment : {objectId del usuario , nombre del usuario , mensaje}
                return response.data.response.comments // Array de todos los comentarios con el nuevo
                
            } catch (error) {
                console.log('error en tasks actions ', error)
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

    deleteComment: (commentId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/task/comment/' + commentId)
                return response.data.response.comments // Array de todos los comentarios si el borrado

            } catch {
                console.log('error en tasks actions ')
            }
        }
    }
}

export default commentActions