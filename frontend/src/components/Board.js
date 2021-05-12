import { useState } from 'react'
import {connect} from 'react-redux'
import boardActions from '../redux/actions/boardActions'
const Board = (props) => {
    //recibir por props del padre el board, para poder editar.
    const [contentBoard, setContentBoard] = useState(board)
    const editBoard = () => {
        props.editBoard(idBoard, contentBoard)
    }
    return(
        <div>
            <input type="text" value={commentBoard} onChange={e => setCommentBoard(e.target.value)}/>
            <button onclick={editBoard}>edit Board</button>
        </div>
    )
}
const mapDispatchToProps = {
    editBoard: boardActions.editBoard
}
export default connect(null, mapDispatchToProps)(Board)