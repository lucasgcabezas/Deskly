import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import commentActions from '../redux/actions/commentActions'
import taskActions from '../redux/actions/taskActions'
import Comment from './Comment'

const TaskModal = (props) => {

    const { title, _id } = props.task
    const { addComment, setShow, show, userLogged, editTask } = props

    const [newComment, setNewComment] = useState({ userId: '', userCompleteName: '', message: '' })
    const [commentsState, setCommentsState] = useState([])
    const [editDescription, setEditDescription] = useState(true)
    const [newDescription, setNewDescription] = useState({ description: '' })

    let display = !show ? 'none' : 'block'
    let userId = '609c18aad4020c529018f542'
    let userName;
    let token = props.userLogged && props.userLogged.token
    if (userLogged) {
        userName = `${userLogged.firstName} ${userLogged.lastName}`
    }

    useEffect(() => { 
        setCommentsState(props.task.comments) 
        setNewDescription({ description: props.task.description })
    }, [])

    const readDataNewComment = (e) => {
        let value = e.target.value;
        setNewComment({
            message: value,
            userCompleteName: userName //aca va el username cuando lo reciba 
        })
    }

    const sendComment = async () => {
        if (Object.values(newComment).some(valor => valor === "")) {
            alert('comentario vacio')
            return false
        }
        let response = await addComment(_id, newComment, token)
        setCommentsState(response)
        setNewComment({ userId: '', userCompleteName: '', message: '' })
    }

    const sendDescription = async () => {
        const response = await editTask(props.task._id, newDescription)
        setNewDescription({ description: response.description })
        setEditDescription(!editDescription)
    }

    let descriptionText = newDescription.description === '' ? 'Añadir una descripción mas detallada' : newDescription.description

    return (
        <>
            <div style={{ display: display }}>
                <div style={{ display: "flex" }}>
                    <div>
                        <h3>{title}</h3>
                        {/* <p>en la lista "nombre de la lista de tarea"</p> */}
                    </div>
                    <button onClick={() => setShow(false)}>X</button>
                </div>
                <div> 
                    <h3>Descripción</h3>
                        <>
                            {editDescription && <p style={{ cursor: 'pointer' }} onClick={() => { setEditDescription(!editDescription) }}>{descriptionText ?descriptionText :'Añadir una descripción mas detallada'}</p>}
                            {!editDescription && <div>
                                <textarea placeholder='Añadir una descripción mas detallada' type="text" value={newDescription.description} onChange={(e) => setNewDescription({ description: e.target.value })} />
                                <button onClick={sendDescription} >guardar</button>
                                <button onClick={() => setEditDescription(!editDescription)}>cancelar</button>
                            </div>
                            }
                        </>
                </div>
                <div>
                    <h3>Actividad</h3>
                    {commentsState.length === 0
                        ? <h3>Sin comentarios</h3>
                        : commentsState.map(comment => {
                            return <Comment key={comment._id} comment={comment} setCommentsState={setCommentsState} idTask={_id} />
                        })
                    }
                    <div>
                        <div>
                            <p>foto user</p>
                        </div>
                        <div>
                            <input placeholder="Escriba un comentario..." name="message" value={newComment.message} onChange={readDataNewComment}></input>
                            <button onClick={sendComment}>Guardar</button>
                        </div>
                    </div>

                </div>
            </div>
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
    editTask: taskActions.editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal)