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
        <div>
            <div className="contenedorTask" style={{ backgroundColor: verify ? 'lightgreen' : 'white' }}>
                <div onClick={() => setShow(true)}>
                    <div className="taskInfo">
                        <span className="taskTitle" style={{ display: editButton ? 'none' : 'block' }}>{title}</span>
                        <div className="contenedorInputEditTask" style={{ display: editButton ? 'flex' : 'none' }}>
                            <input className="inputEditTask" type="text" onChange={getInput} value={editionTask.title}></input><span onClick={() => sendEdit("title")} style={{ display: editButton ? 'block' : 'none' }} class="material-icons-outlined iconoTaskPlanner">send</span>
                        </div>
                        <div className="inputActions">
                            <span onClick={() => setEditButton(!editButton)} class="material-icons-outlined iconoTaskPlanner">edit</span>
                            <span onClick={sendDeleteTask} className="material-icons-outlined iconoTaskPlanner">delete</span>
                            <input className="inputVerify" type="checkbox" onChange={verifyTask} checked={editionTask.verify}></input>
                        </div>
                    </div>
                </div>
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
    recycleTask: taskActions.recycleTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
