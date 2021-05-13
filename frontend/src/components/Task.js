import { useState } from 'react'
import { connect } from 'react-redux'
import taskActions from '../redux/actions/taskActions'

const Task = (props) => {
    console.log(props)
    // const { task, allTasks, setAllTasks, editTask, deleteTask } = props
    // // const { _id, title, verify } = task



    // const [editionTask, setEditionTask] = useState({ title, verify })

    // const [editButton, setEditButton] = useState(false)

    // const getInput = e => { setEditionTask({ ...editionTask, title: e.target.value }) }

    // const sendEdit = async () => {
    //     if (editTask.title.length > 0) {
    //         const response = await editTask(_id, editTask)
    //         const editedTasks = allTasks.map(task => {
    //             if (task._id === response._id) {
    //                 return { ...task, title: response.title }
    //             }
    //             return task
    //         })
    //         setAllTasks(editedTasks)
    //     }
    // }

    // const sendDeleteTask = async () => {
    //     const response = await deleteTask(_id)
    //     setAllTasks({
    //         allTasks: allTasks.filter(task => task._id != response._id)
    //     })
    // }


    // return (
    //     <div style={{ backgroundColor: verify ? 'green' : 'red', border: 'solid 1px black', padding: '2vh 1vw' }}>

    //         <div>
    //             <span style={{ display: editTask ? 'block' : 'none' }}>{title}</span>
    //             <input type="text" onChange={getInput} value={editTask.title} style={{ display: editTask ? 'none' : 'block' }}></input>
    //             {/* <input tipe="checkbox" onChange={()=>setEditionTask({...editionTask, editionTask.verify })} ></input> */}

    //             <button onClick={() => setEditButton(!editButton)}>Editar</button>
    //             <button onClick={sendDeleteTask}>Borrar</button>
    //         </div>

    //         <button onClick={sendEdit} style={{ display: editTask ? 'none' : 'block' }}>Confirmar</button>
    //     </div>
    // )

    return <span>hola</span>
}



const mapDispatchToProps = {
    editTask: taskActions.editTask,
    deleteTask: taskActions.deleteTask,
}

export default connect(null, mapDispatchToProps)(Task)
