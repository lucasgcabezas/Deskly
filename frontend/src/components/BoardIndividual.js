import { Link } from 'react-router-dom'
const BoardIndividual = ({ board }) => {
    // console.log(board)
    return (
        <Link to={`/board/${board._id}`}>
            <div>
                <div>{board.title}</div>
            </div>
        </Link>
    )
}
export default BoardIndividual