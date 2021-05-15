const initialState = {
    userLogged: null,
    boardsAdminArray:[],
    boardsOwnerArray:[],
    commentsUserArray:[],
    taskPlannersArray:[],
}

const authReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
       
        case 'LOG_USER':
            localStorage.setItem('userLogged', JSON.stringify({ firstName: action.payload.firstName, userPic: action.payload.img }))
            localStorage.setItem('token', action.payload.token)
            return { ...state, userLogged: action.payload }

        case 'LOGOUT_USER':
            localStorage.clear()
           
            return { ...state, userLogged: null }
        
        case 'USER_COMPONENTS': 
            return { 
                ...state, 
                boardsAdminArray: action.payload.boardAdminArray, 
                boardsOwnerArray: action.payload.boardOwnerId, 
                commentsUserArray: action.payload.idComents, 
                taskPlannersArray: action.payload.taskPlanners, 
            }
        default:
            return state
    }
}

export default authReducer

