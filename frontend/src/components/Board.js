import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import boardActions from '../redux/actions/boardActions'
import taskPlannerActions from '../redux/actions/taskPlannerActions'
import TaskPlanner from './Taskplanner'

const Board = (props) => {
    const [allTasksPlanner, setAllTasksPlanner] = useState([])
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const idParams = props.match.params.id
    const [board, setBoard] = useState({})

    // useEffect(()=>{
    //     if (props.boards.length === 0) {
    //         props.history.push('/myDesk')
    //     } else {
    //         setBoard(props.boards.find(board => board._id === idParams))
    //     }
    // },[])

    // const enter = (e) => {
    //     if(e.key === 'Enter'){
    //         sendValues()
    //     }
    // }

    const tasksFetch = async () => {
        const tasks = await props.getTaskPlannerFromBoard(props.match.params.id)
        setAllTasksPlanner(tasks)
    } 
    useEffect(() =>{
        tasksFetch()
    },[])

    

    // const sendValues = async () => {
    //     // if(newTitle.trim() !== ""){
    //     //     await props.addTaskPlanner({title: newTitle, boardId: props.board._id})
    //     //     const tasks = await props.getTaskPlannerFromBoard(props.board._id)
    //     //     setAllTasksPlanner(tasks)
    //     //     setNewTitle('')
    //     // }
    // }

    const edit = async (idTaskPlanner,titleTaskPlanner) => {
        // await props.editTaskPlanner(idTaskPlanner, titleTaskPlanner)
        // tasksFetch()
    }

    const erase = async (idTaskPlanner) => {
        // await props.deleteTaskPlanner(idTaskPlanner)
        // tasksFetch()
    }
    const consoleada = async () => {
        console.log(allTasksPlanner)
    }
    
     return(
         <>
         <div>
            {/* <h1>{board.title}</h1>
             <span>{board.description}</span>
         </div>
         <button onClick={tasksFetch}>Carga comentarios</button>
         <div>
             <button onClick={setOpen(!open)}>Add list</button> */}
            {/* {
                open && <div>
                    <input onKeyDown={(e)=>enter(e)} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                </div>
            } */}
            <div>
                {allTasksPlanner.map(taskplanner => <h2>{taskplanner.title}</h2>)}
            </div>
         </div> 
         <button onClick={consoleada}> console log</button>
    <button onClick={tasksFetch}> fecheo</button>
    <h1>hola hola</h1>
        </>
    )


    // return( <>
   
    // </>)
}
const mapStateToProps = state => {
    return{
        boards: state.boardReducer.boards
    }
}
const mapDispatchToProps = {
    editBoard: boardActions.editBoard,
    addTaskPlanner: taskPlannerActions.addTaskPlanner,
    getTaskPlannerFromBoard: taskPlannerActions.getTaskPlannerFromBoard,
    editTaskPlanner: taskPlannerActions.editTaskPlanner,
    deleteTaskPlanner: taskPlannerActions.deleteTaskPlanner

}
export default connect(mapStateToProps, mapDispatchToProps)(Board)