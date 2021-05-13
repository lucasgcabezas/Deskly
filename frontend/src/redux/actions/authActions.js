import axios from 'axios'

const authActions = {
    signUpUser: (user) => {
        return async (dispatch, getState) => {

            try {
                const response = await axios.post('http://localhost:4000/api/newuser', user)
                
                // if (response.data.errorsValidator) {
                //     return response.data.errorsValidator

                // } else if (response.data.error) {
                //     alert('Error',response.data.error, 'danger')

                // } else {
                    dispatch({ type: 'LOG_USER', payload: response.data })
                    // alert(response.data.response.firstName,`Welcome to Mytinerary!`, 'success')
                // }
            } catch {
                
                alert('Error','Internal server error, please try later!', 'danger')
            }
        }
    },

    signInUSer: (userToSignIn) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/login', userToSignIn)
               
                // if (!response.data.success) {
                //     alert('Oops',response.data.error, 'danger')
                // } else {
                    console.log(response)
                    dispatch({ type: 'LOG_USER', payload: response.data.response })
                    alert(response.data.response.firstName + 'Welcome to Deskly! success')
                // }
            } catch (error){
                // alert('ricardo','Internal server error, please try later!', 'danger')
                alert(error)
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
                alert({err})
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
    existUser:  (email) => {
        return async (dispatch, getSate) => {
            try {
                const response = await axios.get('http://localhost:4000/api/existuser/'+email)
                console.log(response)
                return response.data.success
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default authActions