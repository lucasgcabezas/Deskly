import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'
import authActions from '../redux/actions/authActions'
import taskPlannerActions from '../redux/actions/taskPlannerActions'
import TaskPlanner from './Taskplanner'

const Board = (props) => {
    const [allTasksPlanner, setAllTasksPlanner] = useState([])
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const idParams = props.match.params.id
    const [board, setBoard] = useState({})
    const [updateInput, setUpdateInput] = useState()
    const [openInvite, setOpenInvite] = useState(false)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        if (props.boards.length === 0) {
            props.history.push('/myDesk')
        } else {
            setBoard(props.boards.find(board => board._id === idParams))
        }
    }, [])

    useEffect(() => { tasksFetch() }, [])

    const tasksFetch = async () => {
        const tasks = await props.getTaskPlannerFromBoard(idParams)
        setAllTasksPlanner(tasks)
    }

    const enter = (e, condition) => {
        if (e.key === 'Enter' && condition === 'title') {
            sendValues()
        }else if(e.key === 'Enter' && condition === 'invite'){
            addUser(newTitle)
        }
    }
    const sendValues = async () => {
        if (newTitle.trim() !== "") {
            await props.addTaskPlanner({ title: newTitle, boardId: board._id })
            const tasks = await props.getTaskPlannerFromBoard(board._id)
            console.log(tasks)
            setAllTasksPlanner(tasks)
            setNewTitle('')
        }
    }

    const addUser = async (email) => {
        const response = await props.existUser(email)
        if(response){
            props.addUserToBoard(board._id, admin, email)
        }
    }

    const edit = async (idTaskPlanner, titleTaskPlanner) => {
        await props.editTaskPlanner(idTaskPlanner, titleTaskPlanner)
        tasksFetch()
    }

    const erase = async (idTaskPlanner) => {
        await props.deleteTaskPlanner(idTaskPlanner)
        tasksFetch()
    }
    const readUpdateInput = (e) => {
        const field = e.target.name
        const value = e.target.value
        setUpdateInput({
            ...updateInput,
            [field]: value
        })
        console.log(updateInput)
    }
    const deleteBoard = async () => {
        await props.deleteBoard(board._id)
        props.history.push('/myDesk')
    }
    // const editBoard = () => {
    //     props.editBoard(board._id, bo)
    // }
  
    return (
        <>
            <div>
                <h1>{board.title}</h1>
                <span>{board.description}</span>
            </div>
            <div>
                <button onClick={deleteBoard}>Delete</button>
                {/* <button onClick={editBoard}>Edit</button> */}
                {/* <input type="text" name="title" value={board.title} onChange={readUpdateInput}/>
            <input type="text" name="description" value={board.description} onChange={readUpdateInput}/> */}
            <button onClick={()=> setOpenInvite(!openInvite)}>Invite</button>
            {
                openInvite && <div>
                    <input onKeyDown={(e) => enter(e, 'invite')} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <div>
                        <input type='checkbox' onClick={() =>setAdmin(!admin)}></input>
                        <h2>Admin</h2>
                    </div>
                    <button onClick={sendValues}>send</button>
                </div>
            }
            </div>

            <div>
                <button onClick={() => setOpen(!open)}>Add list</button>
                {
                    open && <div>
                        <input onKeyDown={(e) => enter(e,'title')} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <button onClick={sendValues}>send</button>
                    </div>
                }
                <div style={{ display: 'flex', margin: '20px' }}>
                    {
                        allTasksPlanner.map(taskplanner => <TaskPlanner erase={erase} edit={edit} key={taskplanner.title} setAllTasksPlanner={setAllTasksPlanner} taskplanner={taskplanner} />)
                    }
                </div>
            </div>

        </>


    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
        boards: state.boardReducer.boards
    }
}
const mapDispatchToProps = {
    editBoard: boardActions.editBoard,
    deleteBoard: boardActions.deleteBoard,
    addTaskPlanner: taskPlannerActions.addTaskPlanner,
    getTaskPlannerFromBoard: taskPlannerActions.getTaskPlannerFromBoard,
    editTaskPlanner: taskPlannerActions.editTaskPlanner,
    deleteTaskPlanner: taskPlannerActions.deleteTaskPlanner,
    existUser: authActions.existUser,
    addUserToBoard: boardActions.addUserToBoard
}
export default connect(mapStateToProps, mapDispatchToProps)(Board)
