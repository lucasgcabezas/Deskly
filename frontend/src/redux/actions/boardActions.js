import axios from "axios"

const boardActions = {
    deleteBoard: (id,token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete("http://localhost:4000/api/board/" + id, {headers: {
                    'Authorization': 'Bearer ' + token
                }})
                dispatch({type: 'DELETE_BOARDS', payload:response.data.response._id})
            } catch (error){
                alert('Error','Internal server error, please try later!', 'danger')
                console.log(error)
            }
        }
    },
    addBoard: (board) => {
        const {title, description, token} = board
        try {
            return async (dispatch, getState) => {
                const response = await axios.post('http://localhost:4000/api/board', {title, description}, {
                    headers: {
                        'Authorization': 'Bearer ' +token
                    }
                })
                console.log(response)
                dispatch({type: 'ADD_BOARDS', payload:response.data.response})
                console.log(response.data.response)
            }           
        } catch (error) {
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
                return (response.data.response)
            }
        } catch (error) {
            console.log(error)
        }
    },
    getBoards: (token) => {
        try {
            return async (dispatch, getState) => {
                const response = await axios.get("http://localhost:4000/api/board", {headers: {
                    'Authorization': 'Bearer ' +token
                }})
                dispatch({type:'GET_BOARDS', payload:response.data.response})
            }  
        } catch (error) {
            console.log(error)
        }
    },
    addUserToBoard: (idBoard, admin, email) => {
        try {
            return async (dispatch, getState) => {
                await axios.put("http://localhost:4000/api/addUserToBoard/" +idBoard, {admin, email})
            }
        } catch (error) {
            console.log(error)
        }
    },
    // rolToBoard: (token,id) => {        
    //     try {
    //         return async (dispatch, getState) => {
    //             const response = await axios.get("http://localhost:4000/api/roles/" + id, {headers: {
    //                 'Authorization': 'Bearer ' + token
    //             }})
    //         }  
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    // deleteBoardOwner: (token,id) => {        
    //     try {
    //         return async (dispatch, getState) => {
    //             const response = await axios.get("http://localhost:4000/api/rolesOwne/" + id, {headers: {
    //                 'Authorization': 'Bearer ' + token
    //             }})
    //         }  
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

export default boardActions