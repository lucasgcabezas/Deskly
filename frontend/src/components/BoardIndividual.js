import { Link } from 'react-router-dom'
const BoardIndividual = ({ board }) => {
    return (
        <Link to={`/board/${board._id}`}>
            <div className="boardMyDesk">
                <span>{board.title}</span>
            </div>
        </Link>
    )
}
export default BoardIndividual