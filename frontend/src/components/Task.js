import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import taskActions from '../redux/actions/taskActions'
import TaskModal from './TaskModal'

const Task = (props) => {
    const { task, allTasks, setAllTasks, editTask, deleteTask } = props
    const { _id, title, verify } = task

    const [show, setShow] = useState(false)

    const [editionTask, setEditionTask] = useState({ title, verify })

    const [editButton, setEditButton] = useState(false)

    const getInput = e => { setEditionTask({ ...editionTask, title: e.target.value }) }

    useEffect(() => {
        sendEdit("verify") // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editionTask.verify])

    const verifyTask = async (e) => { setEditionTask({ ...editionTask, verify: e.target.checked }) }

    const sendEdit = async (elementToEdit) => {
        if (editionTask.title.length > 0) {
            const response = await editTask(_id, editionTask)
            const editedTasks = allTasks.map(task => {
                if (task._id === response._id) {
                    return { ...task, [elementToEdit]: response[elementToEdit] }
                }
                return task
            })
            setAllTasks(editedTasks)
            setEditButton(false)
        }
    }

    const sendDeleteTask = async () => {
        const response = await deleteTask(_id)
        let arrayFiltered = allTasks.filter(task => task._id !== response._id)
        setAllTasks(arrayFiltered)
    }
    let style = props.imOwner || props.imAdmin ? 'block' : 'none'
    return (
        <div >
            <div className="contenedorTask" style={{ backgroundColor: verify ? 'lightgreen' : 'white' }}>
                <div>
                    <div className="taskInfo">
                        <span style={{ display: editButton ? 'none' : 'block' }}>{title}</span>
                        <input type="text" onChange={getInput} value={editionTask.title} style={{ display: editButton ? 'block' : 'none' }}></input>
                        <input type="checkbox" onChange={verifyTask} checked={editionTask.verify}></input>
                    </div>

                    <div>
                        <div style={{ display: style }}>
                            <button onClick={() => setEditButton(!editButton)}>Editar</button>
                            <button onClick={sendDeleteTask}>Borrar</button>
                        </div>
                        <button onClick={() => setShow(true)}>modal</button>
                    </div>
                </div>
                <button onClick={() => sendEdit("title")} style={{ display: editButton ? 'block' : 'none' }}>Confirmar</button>
                {/* {show && <TaskModal task={task} setShow={setShow} show={show} />} */}
                <TaskModal task={task} setShow={setShow} show={show} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        commentsUserArray: state.authReducer.commentsUserArray,
    }
}

const mapDispatchToProps = {
    editTask: taskActions.editTask,
    deleteTask: taskActions.deleteTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
