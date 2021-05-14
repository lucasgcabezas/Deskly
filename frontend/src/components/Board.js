import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'
import authActions from '../redux/actions/authActions'
import taskPlannerActions from '../redux/actions/taskPlannerActions'
import TaskPlanner from './Taskplanner'

const Board = (props) => {
    const { boards, inviteUserToBoard } = props
    const [allTasksPlanner, setAllTasksPlanner] = useState([])
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newInvite, setNewInvite] = useState('')
    const idParams = props.match.params.id
    const [board, setBoard] = useState({})
    const [updateInput, setUpdateInput] = useState()
    const [openInvite, setOpenInvite] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [boardUsers, setBoardUsers] = useState([])
    
    useEffect(() => {
        if (props.boards.length === 0) {
            props.history.push('/myDesk')
        } else {
            setBoard(boards.find(board => board._id === idParams))
        }
        tasksFetch() 
        usersFetch()
        
        const reloadTaskPlanner = setInterval(() => {
            tasksFetch()
        }, 5000)

        return () => { clearInterval(reloadTaskPlanner) }
    }, [])

    const tasksFetch = async () => {
        const tasks = await props.getTaskPlannerFromBoard(idParams)
        setAllTasksPlanner(tasks)
    }

    const usersFetch = async () => {
        const users = await props.getUsersFromBoard(idParams)
        setBoardUsers(users)
    }
    const enter = (e, condition) => {
        if (e.key === 'Enter' && condition === 'title') {
            sendValues()
        } else if (e.key === 'Enter' && condition === 'invite') {
            addUser()
        }
    }

    const sendValues = async () => {
        if (newTitle.trim() !== "") {
            await props.addTaskPlanner({ title: newTitle, boardId: board._id },props.userLogged.token)
            const tasks = await props.getTaskPlannerFromBoard(board._id)
            setAllTasksPlanner(tasks)
            setNewTitle('')
        }
    }

    const addUser = () => {
        inviteUserToBoard(newInvite, board._id)
        setNewInvite('')
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
    }

    const deleteBoard = async () => {
        await props.deleteBoard(board._id,props.userLogged.token)
        props.history.push('/myDesk')
    }
    const editBoard = async () => {
        const response = await props.editBoard(board._id, updateInput, props.userLogged.token)
        setBoard(response)
        setUpdate(false)
    }

    return (
        <>
            <div>
                {
                    boardUsers.map((user,i) => {
                    return <div key={i} style={{display:"flex"}}><input type='checkbox' onClick={() => setAdmin(!admin)}></input><h2>{'Admin ' + user.firstName + ' ' + (user.lastName === null ? '' : user.firstName)}</h2><h2></h2></div>})
                }
            </div>
            <div>
                <h1>{board.title}</h1>
                <span>{board.description}</span>
            </div>
            <div>
                <button onClick={deleteBoard}>Delete</button>
                <button onClick={() => { setUpdate(!update); setUpdateInput({ title: board.title, description: board.description }) }}>{update ? 'Cancel' : 'Edit'}</button>
                {update &&
                    <>
                        <input type="text" name="title" value={updateInput.title} onChange={readUpdateInput} />
                        <input type="text" name="description" value={updateInput.description} onChange={readUpdateInput} />
                        <button onClick={editBoard}>Send</button>
                    </>
                }

                <button onClick={() => setOpenInvite(!openInvite)}>Invite</button>
                {
                    openInvite && <div>
                        <input onKeyDown={(e) => newInvite.trim() && enter(e, 'invite')} type="text" value={newInvite} onChange={(e) => setNewInvite(e.target.value)} />
                        {/* <div>
                            <input type='checkbox' onClick={() => setAdmin(!admin)}></input>
                            <h2>Admin</h2>
                        </div> */}
                        <button onClick={newInvite.trim() && addUser}>send</button>
                    </div>
                }
            </div>

            <div>
                <button onClick={() => setOpen(!open)}>Add list</button>
                {
                    open && <div>
                        <input onKeyDown={(e) => enter(e, 'title')} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <button onClick={sendValues}>send</button>
                    </div>
                }
                <div style={{ display: 'flex', margin: '20px' }}>
                    {
                        allTasksPlanner.map(taskplanner => <TaskPlanner erase={erase} edit={edit} key={taskplanner._id} setAllTasksPlanner={setAllTasksPlanner} taskplanner={taskplanner} />)
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
    inviteUserToBoard: authActions.inviteUserToBoard,
    addUserToBoard: boardActions.addUserToBoard,
    deleteBoardOwner: boardActions.deleteBoardOwner,
    getUsersFromBoard: boardActions.getUsersFromBoard
}
export default connect(mapStateToProps, mapDispatchToProps)(Board)
