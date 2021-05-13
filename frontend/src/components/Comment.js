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
        <div style={{ display: 'flex', flexDirection: 'column', border: 'solid 1px black', padding: '10px' }}>
            <span>{userCompleteName}</span>
            <span style={{ display: editButtonShow ? 'none' : 'block' }}>{message}</span>


            <input type="text" value={editionComment.message} onChange={getInput} style={{ display: editButtonShow ? 'block' : 'none' }}></input>

            <div>
                <button onClick={sendDeleteComment}>BorrarC</button>
                <button onClick={() => setEditButtonShow(!editButtonShow)}>EditarC</button>
                <button onClick={sendEditComment} style={{ display: editButtonShow ? 'block' : 'none' }}>ConfirmarEdit</button>
            </div>
        </div>
    )





}


const mapDispatchToProps = {
    editComment: commentActions.editComment,
    deleteComment: commentActions.deleteComment
}

// export default Comment
export default connect(null, mapDispatchToProps)(Comment)
