import React, {useState} from "react"
import taskActions from "../redux/actions/taskActions"
import React, {useState} from "react"
import {connect} from "react-redux"


const TaskPlanner = (props) => {
    const [allTasks, setAllTasks] = useState([])
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const enter = (e) => {
        if(e.key === 'Enter'){
            sendValues()
        }
    }
    const sendValues = () => {
        if(newTitle.trim() !== ""){
            await props.addTask({title: newTitle, taskplannerId: props.taskplannerId._id})
            const tasks = await props.tasksFromTaskplanner(props.taskplannerId._id)
            setAllTasks(tasks)
            setNewTitle('')
        }
    }
    return(
        <div>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <h1>titulo</h1>

            <button onClick={setOpen(!open)}></button>
            {
                open && <div>
                    <input onKeyDown={(e)=>enter(e)} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                </div>
            }
            
        </div>      
    )
}

const mapDispatchToProps = {
    addTask: taskActions.addTask,
    tasksFromTaskplanner: taskActions.tasksFromTaskplanner
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPlanner)
