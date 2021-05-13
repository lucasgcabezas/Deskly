import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import commentActions from '../redux/actions/commentActions'
import taskActions from '../redux/actions/taskActions'

const TaskModal = (props) => {

    const { title, description, _id } = props.task
    const { addComment, setShow, show, userLogged, editTask } = props

    const [newComment, setNewComment] = useState({ userId: '', userCompleteName: '', message: '' })
    const [comments, setComments] = useState([])
    const [editDescription, setEditDescription] = useState(true)
    const [newDescription, setNewDescription] = useState({description: ''})

    let display = !show ? 'none' : 'block'
    let userId = '609c18aad4020c529018f542'
    let userName;
    if (userLogged) {
        userName = `${userLogged.firstName} ${userLogged.lastName}`
    }
    useEffect(() => { setComments(props.task.comments) }, [])
    const readDataNewComment = (e) => {
        let value = e.target.value;
        setNewComment({
            message: value,
            userId: userId,//aca va el userid cuando lo reciba 
            userCompleteName: userName //aca va el username cuando lo reciba 
        })
    }
    const sendComment = async () => {
        if (Object.values(newComment).some(valor => valor === "")) {
            alert('comentario vacio')
            return false
        }
        let response = await addComment(_id, newComment)
        setComments(response)
        setNewComment({ userId: '', userCompleteName: '', message: '' })
    }
    const sendDescription = async () => {
        const response = await editTask(props.task._id, newDescription)
        setNewDescription({description: response.description})
        setEditDescription(!editDescription)
    }
    
    let descriptionText = newDescription.description === ''?props.task.description : newDescription.description
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
                    {editDescription && <h1 style={{ cursor: 'pointer' }} onClick={() => {setEditDescription(!editDescription)}}>{descriptionText}</h1>}
                    {!editDescription && <div>
                        <input  type="text" value={newDescription.description} onChange={(e) => setNewDescription({description: e.target.value})}/>
                        <button onClick={sendDescription} >guardar</button>
                        <button onClick={()=>setEditDescription(!editDescription)}>cancelar</button>
                    </div>
                    }
                </div>
                <div>
                    <h3>Actividad</h3>
                    {comments.length === 0
                        ? <h2>Sin comentarios</h2>
                        : comments.map((comment, index) => {
                            return (<div key={index}>
                                <h4>{comment.userCompleteName}</h4>
                                <h4>{comment.message}</h4>
                            </div>
                            )
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