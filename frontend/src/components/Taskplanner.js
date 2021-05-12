import { useEffect, useState } from 'react'
import taskActions from "../redux/actions/taskActions"
// import React, { useState } from "react"
import { connect } from "react-redux"
import Task from "./Task"

const TaskPlanner = (props) => {
    const [allTasks, setAllTasks] = useState([])
    const [preloader, setPreloader] = useState(true)
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [editTitle, setEditTitle] = useState(true)
    console.log(props)
    useEffect(() => { fetchAllTasks() }, [])

    const fetchAllTasks = async () => {
        const response = await props.tasksFromTaskplanner
        setAllTasks(response)
        setPreloader(false)
    }

    const enter = (e, condition) => {
        if (condition === 'task' && e.key === 'Enter') {
            sendValues()
        } else if (condition === 'edit' && e.key === 'Enter') {
            props.edit(props.taskplanner._id, newTitle)
        }
    }

    const sendValues = async () => {
        if (newTitle.trim() !== "") {
            await props.addTask({ title: newTitle, taskplannerId: props.taskplannerId._id })
            const tasks = await props.tasksFromTaskplanner(props.taskplannerId._id)
            setAllTasks(tasks)
            setNewTitle('')
        }
    }

    
    return(
        <div>
            <div>
                <button onClick={() => props.erase(props.taskplanner._id)}>Delete</button>
            </div>
            {editTitle && <h1 onClick={() => setEditTitle(!editTitle)}>{props.taskplanner.title}</h1>}
            {!editTitle && <div>
                <input onKeyDown={(e)=>enter(e,'edit')} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                <button onClick={newTitle.trim() && (() =>props.edit(props.taskplanner._id, newTitle))}>Send</button>
            </div> 
            }
            <button onClick={() => setOpen(!open)}></button>
            {
                open && <div>
                    <input onKeyDown={(e)=>enter(e,'task')} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <button onClick={sendValues}>Send</button>
                </div>
            }

            <div>
                {preloader
                    ? <span>cargando</span>
                    : allTasks.map(task => <Task key={task._id} task={task} allTasks={allTasks} setAllTasks={setAllTasks} />)
                }
            </div>

        </div>
    )
}

const mapDispatchToProps = {
    addTask: taskActions.addTask,
    tasksFromTaskplanner: taskActions.tasksFromTaskplanner,
    editTaskPlanner: taskActions.editTaskPlanner
}

export default connect(null, mapDispatchToProps)(TaskPlanner)
