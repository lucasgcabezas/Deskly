import { useState } from "react";
import {connect} from 'react-redux';
import commentActions from '../redux/actions/commentActions'

const TaskModal = ({addComment}) => {

    
    const [newComment, setNewComment] = useState('')
    const [show, setShow] = useState(true)
    let display = !show ? 'none' : 'block'

    const sendComment = async () => {
        if (newComment === '') {
            alert('comentario vacio')
            return false
        }
        let taskId= '609be485d3f81948bc8b48dd'
        await addComment(taskId, newComment)
        setNewComment('')
    }

    return (
        <>
            <button onClick={() => setShow(true)}>Show</button>
            {show &&
                <div style={{ display: display }}>
                    <div>
                        <div>
                            <h3>titulo de la tarea</h3>
                            <p>en la lista "nombre de la lista de tarea"</p>
                        </div>
                        <button onClick={() => setShow(false)}>X</button>
                    </div>
                    <div>
                        <h3>Descripcion</h3>
                        <div>
                            <input placeholder="Añadir una descripcion"></input>
                        </div>
                    </div>
                    <div>
                        <h3>Actividad</h3>
                        <div>
                            <h1>comment del usuario</h1>
                        </div>
                        <div>
                            <div>
                                <p>foto user</p>
                            </div>
                            <div>
                                <input placeholder="Escriba un comentario..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                                <button onClick={sendComment}>Guardar</button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>

    );
}


const mapDispatchToProps = {
    addComment: commentActions.addComment
}

export default connect(null, mapDispatchToProps)(TaskModal)