const initialState = {
    boards: []
}
const boardReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_BOARDS':
            return{
                boards: action.payload
            }    
        default:
            return state
    }
}
export default boardReducer