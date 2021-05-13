const initialState = {
    boards: []
}
const boardReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_BOARDS':
            return{
                boards: action.payload
            }
        case 'ADD_BOARDS':
            
            // console.log(state.boards.map(board => board._id !== action.payload._id && state.boards.push(action.payload)))
            return{
                ...state,
                // state.boards.map(board => board._id !== action.payload._id && state.boards.push(action.payload))
                // boards: state.boards.push(action.payload)
                boards: state.boards.push(action.payload._id !== state.boards._id)
                
            }
        case 'DELETE_BOARDS':
            return{
                ...state,
                boards: state.boards.filter(board => board._id === action.payload)
            }         
        default:
            return state
    }
}
export default boardReducer