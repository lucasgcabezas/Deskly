import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import boardActions from '../redux/actions/boardActions'
import taskPlannerActions from '../redux/actions/taskPlannerActions'
import TaskPlanner from './Taskplanner'

const Board = (props) => {
<<<<<<< HEAD
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
=======
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    // const idParams = props.match.params.id
    const idParams = "609c215b8660732dc428acd2"
    const [board, setBoard] = useState({})
    const [allTasksPlanner, setAllTasksPlanner] = useState([])

    
    useEffect(()=>{
        if (props.boards.length === 0) {
            props.history.push('/myDesk')
        } else {
            setBoard(props.boards.find(board =>{ 
                
                return board._id === idParams}))
        }
    },[])

    useEffect(() => { tasksFetch() }, [])
    
    const tasksFetch = async () => {

        const tasks = await props.getTaskPlannerFromBoard(idParams)
        
        setAllTasksPlanner(tasks)
    } 



    const enter = (e) => {
        if(e.key === 'Enter'){
            sendValues()
        }
    }
    


    const sendValues = async () => {
        if(newTitle.trim() !== ""){
            await props.addTaskPlanner({title: newTitle, boardId: board._id})
            const tasks = await props.getTaskPlannerFromBoard(board._id)
            setAllTasksPlanner(tasks)
            setNewTitle('')
        }
    }
>>>>>>> 969487ae2987b119bb6c589b237e8420e463353a

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
    
<<<<<<< HEAD
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
=======
    return(
        <>
        <div>
            <h1>{board.title}</h1>
            <span>{board.description}</span>
        </div>
        <div>
             <button onClick={()=>setOpen(!open)}>Add list</button>
            {
>>>>>>> 969487ae2987b119bb6c589b237e8420e463353a
                open && <div>
                    <input onKeyDown={(e)=>enter(e)} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <button onClick={sendValues}></button>
                </div>
<<<<<<< HEAD
            } */}
            <div>
                {allTasksPlanner.map(taskplanner => <h2>{taskplanner.title}</h2>)}
            </div>
         </div> 
         <button onClick={consoleada}> console log</button>
    <button onClick={tasksFetch}> fecheo</button>
    <h1>hola hola</h1>
=======
            }
            <div style={{display: 'flex'}}>
                {
                
                allTasksPlanner.map(taskplanner => <TaskPlanner erase={erase} edit={edit} key={taskplanner.title} setAllTasksPlanner={setAllTasksPlanner} taskplanner={taskplanner}/>)}
            </div>
        </div> 
>>>>>>> 969487ae2987b119bb6c589b237e8420e463353a
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
<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(Board)
=======

export default connect(mapStateToProps, mapDispatchToProps)(Board)

>>>>>>> 969487ae2987b119bb6c589b237e8420e463353a
