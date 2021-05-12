import React, { useEffect, useState } from "react"
import taskActions from "../redux/actions/taskActions"
import React, { useState } from "react"
import { connect } from "react-redux"
import Task from "./Task"


const TaskPlanner = (props) => {
    const [allTasks, setAllTasks] = useState([])
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    useEffect(() => { fetchAllTasks }, [])

    const fetchAllTasks = async () => {
        const response = await props.tasksFromTaskplanner
        setAllTasks(response)
    }


    const enter = (e) => {
        if (e.key === 'Enter') {
            sendValues()
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

    return (
        <div>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <h1>titulo</h1>

            <button onClick={setOpen(!open)}></button>
            {
                open && <div>
                    <input onKeyDown={(e) => enter(e)} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
            }

            <div>
                {
                    allTasks.map(task => {
                        return <Task key={task._id} task={task} allTasks={allTasks} setAllTasks={setAllTasks} />
                    })
                }
            </div>

        </div>
    )
}

const mapDispatchToProps = {
    addTask: taskActions.addTask,
    tasksFromTaskplanner: taskActions.tasksFromTaskplanner
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPlanner)
