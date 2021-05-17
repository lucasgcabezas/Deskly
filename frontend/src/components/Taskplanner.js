import { useEffect, useState } from 'react'
import taskActions from "../redux/actions/taskActions"
import { connect } from "react-redux"
import Task from "./Task"
import { IoSend } from 'react-icons/io5'

const TaskPlanner = (props) => {
    const [allTasks, setAllTasks] = useState([])
    const [preloader, setPreloader] = useState(true)
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newTask, setNewTask] = useState('')
    const [loading, setLoading] = useState(true)
    const [editTitle, setEditTitle] = useState(true)

    useEffect(() => {
        fetchAllTasks()
        const reloadTaskPlanner = setInterval(() => {
            fetchAllTasks()
        }, 5000)
        return () => { clearInterval(reloadTaskPlanner) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchAllTasks = async () => {
        const response = await props.tasksFromTaskplanner(props.taskplanner._id)
        setAllTasks(response)
        setPreloader(false)
    }

    const enter = (e, condition) => {
        if (condition === 'task' && e.key === 'Enter') {
            sendValues()
        } else if (condition === 'edit' && e.key === 'Enter') {
            props.edit(props.taskplanner._id, newTitle)
            setEditTitle(!editTitle)
        }
    }

    const sendValues = async () => {
        if (newTask.trim() !== "") {
            setLoading(false)
            await props.addTask({ title: newTask, taskplannerId: props.taskplanner._id }, props.userLogged.token)
            const tasks = await props.tasksFromTaskplanner(props.taskplanner._id)
            setAllTasks(tasks)
            setNewTask('')
            setLoading(true)
        }
    }

    return (
        <div className="taskPlanner">
            <div className="taskPlannerList">
                <div className="headerTaskPlanner">
                    {editTitle && <h3 style={{ cursor: (props.imOwner || props.imAdmin) && 'pointer' }} onClick={(props.imOwner || props.imAdmin) ? (() => { setEditTitle(!editTitle); setNewTitle(props.taskplanner.title) }) : null}>{props.taskplanner.title}</h3>}
                    {!editTitle &&
                        <>
                        <div className="contenedorEditTitle">
                            <input className="inputEditTitle" onKeyDown={newTitle.trim() ? (e) => { enter(e, 'edit') } : null} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            <button onClick={newTitle.trim() ? (() => { props.edit(props.taskplanner._id, newTitle); setEditTitle(!editTitle) }) : null}>Send</button>
                        </div>
                        <span style={{ cursor: 'pointer' }} onClick={() => setEditTitle(!editTitle)}>x</span>
                        </>
                    }
                    <div style={{ display: props.imOwner || props.imAdmin ? 'block' : 'none' }}>
                        <span onClick={() => props.erase(props.taskplanner._id)} className="material-icons-outlined iconoTaskPlanner">delete</span>
                    </div>
                </div>
                {
                    open && <div>
                        <input onKeyDown={loading && ((e) => enter(e, 'task'))} type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                        <button onClick={loading && sendValues}>Send</button>
                    </div>
                }

                <div>
                    {
                        preloader
                            ? <span>cargando</span>
                            : allTasks.map(task => <Task imAdmin={props.imAdmin} imOwner={props.imOwner} key={task._id} task={task} allTasks={allTasks} setAllTasks={setAllTasks} />)
                    }
                </div>
                <button className="buttonAddTask" onClick={() => setOpen(!open)}>add task</button>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    addTask: taskActions.addTask,
    tasksFromTaskplanner: taskActions.tasksFromTaskplanner,
    editTaskPlanner: taskActions.editTaskPlanner
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPlanner)
