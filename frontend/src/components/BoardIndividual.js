import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'
import { Link } from 'react-router-dom'
import { set } from 'mongoose'
const BoardIndividual = (props) => {
    const [boardSingle, setBoardSingle] = useState({})
    useEffect(()=>{
        getBoardSingle()
    },[])
    const getBoardSingle = async () => {
        const oneBoard = await props.getBoard(props.board)
        setBoardSingle(oneBoard)
    }
    
    return (
        <Link to={`/board/${props.board}`}>
            <div className="boardMyDesk">
                <div>{boardSingle.title}</div>
            </div>
        </Link>
    )
}
const mapDispatchToProps = {
    getBoard: boardActions.getBoard
}
export default connect(null, mapDispatchToProps)(BoardIndividual)