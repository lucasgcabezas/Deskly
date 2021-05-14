import axios from 'axios'

const authActions = {
    signUpUser: (user) => {
        return async (dispatch, getState) => {

            try {
                const response = await axios.post('http://localhost:4000/api/newuser', user)
                if (!response.data.success) {
                    return response.data.error
                }
                // if (response.data.errorsValidator) {
                //     return response.data.errorsValidator

                // } else if (response.data.error) {
                //     alert('Error',response.data.error, 'danger')

                // } else {
                dispatch({ type: 'LOG_USER', payload: response.data })
                // alert(response.data.response.firstName,`Welcome to Mytinerary!`, 'success')
                // }
            } catch {

                alert('Error', 'Internal server error, please try later!', 'danger')
            }
        }
    },

    signInUSer: (userToSignIn) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/login', userToSignIn)
                if (!response.data.success) {
                    alert(response.data.error)
                    return false
                }
                // if (!response.data.success) {
                //     alert('Oops',response.data.error, 'danger')
                // } else {
                dispatch({ type: 'LOG_USER', payload: response.data.response })
                alert("Bienvenido a Deskly")
                // alert(response.data.response.firstName + 'Welcome to Deskly! success')
                // }
            } catch (error) {
                console.log(error)
                // alert('ricardo','Internal server error, please try later!', 'danger')
                // alert(error)
            }
        }
    },

    signInLocalStorage: (userLocalStorage) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/relogin', {
                    headers: { 'Authorization': 'Bearer ' + userLocalStorage }
                })
                dispatch({ type: 'LOG_USER', payload: { ...response.data.response, token: userLocalStorage } })
            } catch (err) {
                alert({ err })
                dispatch({ type: 'LOGOUT_USER' })
            }
        }
    },

    signOut: () => {
        return async (dispatch, getState) => {
            alert('Goodbye!', 'Hope to see you soon!', 'info')
            dispatch({ type: 'LOGOUT_USER' })

        }
    },

    inviteUserToBoard: (email, boardId) => {
        return async (dispatch, getSate) => {
            console.log(email)
            try {
                const response = await axios.put('http://localhost:4000/api/inviteuser/' + email, {boardId})

                console.log(response)
                return response.data.success
            } catch (err) {
                console.log(err)
            }
        }
    },

    checkNotifications: (userLs) => {
        return async (dispatch, getSate) => {
            try {
                const response = await axios.get('http://localhost:4000/api/checkNotifications' , {
                    headers: { 'Authorization': 'Bearer ' + userLs.token }
                })
                return response.data.response

            } catch (err) {
                console.log(err)
            }
        }
    },

    acceptJoinToBoard: (boardId, userLs) => {
        return async (dispatch, getSate) => {
            try {
                const response = await axios.get('http://localhost:4000/api/notification/'+ boardId , {
                    headers: { 'Authorization': 'Bearer ' + userLs.token }
                })
                // console.log(response)
                dispatch({ type: 'ADD_BOARDS', payload: response.data.response.board })
                return response.data.response.notification

            } catch (err) {
                console.log(err)
            }
        }
    },

    setUserComponents: (token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/usercomponents', {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                console.log(response)
                dispatch({ type: 'USER_COMPONENTS', payload: { ...response.data.response } })
            } catch { }
        }
    },
}

export default authActions