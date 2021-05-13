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

    signInUSer: (userToSignIn, googleFlag) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/login', userToSignIn, googleFlag )
                // if (!response.data.success) {
                //     alert('Oops',response.data.error, 'danger')
                // } else {
                    dispatch({ type: 'LOG_USER', payload: response.data.response })
                    alert(response.data.response.firstName + 'Welcome to Mytinerary! success')
                // }
            } catch {
                alert('Error','Internal server error, please try later!', 'danger')
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
                if (err.response.status === 401) {
                    alert("Me parece que me estás queriendo cagar con un token falso...")
                }
            }
        }
    },

    signOut: () => {
        return async (dispatch, getState) => {
            alert('Goodbye!', 'Hope to see you soon!', 'info')
            dispatch({ type: 'LOGOUT_USER' })

        }
    }
}

export default authActions