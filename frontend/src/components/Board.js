import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
const Board = (props) => {
    const idParams = props.match.params.id
    const [board, setBoard] = useState({})
    useEffect(()=>{
        if (props.boards.length === 0) {
            props.history.push('/myDesk')
        } else {
            setBoard(props.boards.find(board => board._id === idParams))
        }
    },[])
    return(
        <>
            <h1>{board.title}</h1>
            <span>{board.description}</span>
        </>
    )
}
const mapStateToProps = state => {
    return{
        boards: state.boardReducer.boards
    }
}

export default connect(mapStateToProps)(Board)