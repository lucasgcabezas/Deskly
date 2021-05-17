import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import commentActions from '../redux/actions/commentActions'
import taskActions from '../redux/actions/taskActions'
import Comment from './Comment'

import Modal from 'react-modal'


const TaskModal = (props) => {
    const { title, _id } = props.task
    const { addComment, setShow, show, userLogged, editTask, getComments } = props

    const [newComment, setNewComment] = useState({ userId: '', userCompleteName: '', message: '' })
    const [commentsState, setCommentsState] = useState([])
    const [editDescription, setEditDescription] = useState(true)
    const [newDescription, setNewDescription] = useState({ description: '' })
    const [loading, setLoading] = useState(true)

    let display = !show ? 'none' : 'flex'
    let userName;
    let token = props.userLogged && props.userLogged.token
    if (userLogged) {
        userName = `${userLogged.firstName} ${userLogged.lastName || ''}`
    }

    useEffect(() => {
        if (props.task.comments) {
            setCommentsState(props.task.comments)
        }
        setNewDescription({ description: props.task.description })

        const reloadTaskPlanner = setInterval(() => {
            getAllComments()
        }, 2000)
        return () => { clearInterval(reloadTaskPlanner) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAllComments = async () => {
        const response = await getComments(_id)
        if (response) {
            setCommentsState(response)
        }
    }

    const readDataNewComment = (e) => {
        let value = e.target.value;
        setNewComment({
            message: value,
            userCompleteName: userName //aca va el username cuando lo reciba 
        })
    }

    const sendComment = async () => {
        setLoading(false)
        if (Object.values(newComment).some(valor => valor === "")) {
            alert('comentario vacio')
            setLoading(true)
            return false
        }
        let response = await addComment(_id, newComment, token)
        if (response) {
            setCommentsState(response)
        }
        setNewComment({ userId: '', userCompleteName: '', message: '' })
        setLoading(true)
    }

    const sendDescription = async () => {
        const response = await editTask(props.task._id, newDescription)
        setNewDescription({ description: response.description })
        setEditDescription(!editDescription)
    }

    const enter = (e) => {
        if (e.key === 'Enter') {
            sendComment()
        }
    }
    let descriptionText = newDescription.description === '' ? 'Add a more detailed description' : newDescription.description

    return (
        <>
            <Modal
                isOpen={show}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setShow(!show)}
                // style={customStyles}
                contentLabel="Example Modal"
                className="ModalTaskComponent"
                overlayClassName="OverlayModal"
            >


                <div className="modal" style={{ display: display }}>
                    <div style={{ display: "flex" }}>
                        <div className="taskModalHeader">
                            <h3>{title}</h3>
                            {/* <p>en la lista "nombre de la lista de tarea"</p> */}
                        </div>
                        <span className="material-icons-outlined closeModalTask" onClick={() => setShow(false)}>close</span>
                        {/* <span onClick={() => setNewBoardModal(false)} className="material-icons-outlined closeNewBoardModal">close</span> */}

                    </div>

                    <div className="taskModalDescriptionContainer">
                        <h3>Description</h3>
                        <>
                            {editDescription && <p style={{ cursor: 'pointer' }} onClick={() => { setEditDescription(!editDescription) }}>{descriptionText ? descriptionText : 'Add a detailed description'}</p>}
                            {!editDescription && <div>
                                <textarea placeholder='Add a detailed description' type="text" value={newDescription.description} onChange={(e) => setNewDescription({ description: e.target.value })} />
                                <div className="modalDescriptionButtons">
                                    <button onClick={sendDescription} >Confirm</button>
                                    <button onClick={() => setEditDescription(!editDescription)}>Cancel</button>
                                </div>
                            </div>
                            }
                        </>
                    </div>

                    <h3>Activity</h3>
                    <div className="commentsSection">
                        {commentsState.length === 0
                            ? <span>No comments yet...</span>
                            : commentsState.map(comment => {
                                return <Comment key={comment._id} comment={comment} setCommentsState={setCommentsState} idTask={_id} imOwner={props.imOwner}/>
                            })
                        }
                    </div>

                    <div className="newCommentSection">
                        <input onKeyDown={loading && enter} placeholder="Write a comment..." name="message" value={newComment.message} onChange={readDataNewComment}></input>
                        <button onClick={loading && sendComment}>Save</button>
                    </div>

                </div>

            </Modal>


        </>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}
const mapDispatchToProps = {
    addComment: commentActions.addComment,
    getComments: commentActions.getComments,
    editTask: taskActions.editTask,

}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal)