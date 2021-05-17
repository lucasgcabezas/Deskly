import { useState } from 'react'
import { connect } from 'react-redux'
import commentActions from '../redux/actions/commentActions'

const Comment = (props) => {
    const { comment, idTask, setCommentsState, editComment, deleteComment } = props
    const { userCompleteName, message, _id } = comment

    const [editButtonShow, setEditButtonShow] = useState(false)

    const [editionComment, setEditionComment] = useState({ idComment: _id, message })

    // console.log(editionComment)
    const getInput = e => { setEditionComment({ ...editionComment, message: e.target.value }) }

    // let imComment = props.commentsUserArray.some(commentId =>commentId === String(props.comment._id))

    const sendEditComment = async () => {
        const response = await editComment(idTask, editionComment)
        setCommentsState(response)
        setEditButtonShow(false)
    }

    const sendDeleteComment = async () => {
        const response = await deleteComment(_id)
        setCommentsState(response)
    }

    return (
        <div className="commentTask">
            <div>
                <span className="userNameComment">{userCompleteName}</span>
                {props.userLogged.email === props.comment.userId.email &&
                    <div>
                        <span onClick={sendDeleteComment} className="material-icons-outlined iconoTaskPlanner">delete</span>
                        <span onClick={() => setEditButtonShow(!editButtonShow)} className="material-icons-outlined iconoTaskPlanner">edit</span>
                        <button onClick={sendEditComment} style={{ display: editButtonShow ? 'block' : 'none' }}>ConfirmarEdit</button>
                    </div>}
            </div>
            <span style={{ display: editButtonShow ? 'none' : 'block' }} className="userCommentText">{message}</span>
            <input type="text" value={editionComment.message} onChange={getInput} style={{ display: editButtonShow ? 'block' : 'none' }}></input>
        </div>
    )

}
const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    editComment: commentActions.editComment,
    deleteComment: commentActions.deleteComment
}

// export default Comment
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
