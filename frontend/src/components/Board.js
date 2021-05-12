import { useState } from 'react'
const Board = (props) => {
    console.log(props)
    const idParams = props.match.params.id
    console.log(idParams)
    const [board, setBoard] = useState([])
    if (props.boards.length === 0) {
        props.history.push('/myDesk')
    } else {
        setBoard({
            board: boards.find(board => boards._id === idParams)
        })
    }
    return(
        <h1>aunq sea tirame un hola pa</h1>
    )
}

export default Board