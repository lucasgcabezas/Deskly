import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'
import authActions from '../redux/actions/authActions'
import taskPlannerActions from '../redux/actions/taskPlannerActions'
import TaskPlanner from './Taskplanner'
import UserAdmin from './UserAdmin'

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
    const [boardUsers, setBoardUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (props.userLogged) {
            props.setUserComponents(props.userLogged.token)
        }
        if (props.boards.length === 0) {
            props.history.push('/myDesk')
        } else {
            setBoard(boards.find(board => String(board._id) === idParams))
        }
        tasksFetch()
        usersFetch()

        const reloadTaskPlanner = setInterval(() => {
            if (props.userLogged.token) {
                props.setUserComponents(props.userLogged.token)
            }
            usersFetch()
            tasksFetch()
        }, 5000)

        return () => { clearInterval(reloadTaskPlanner) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tasksFetch = async () => {
        const tasks = await props.getTaskPlannerFromBoard(idParams)
        setAllTasksPlanner(tasks)
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
            setLoading(false)
            await props.addTaskPlanner({ title: newTitle, boardId: board._id }, props.userLogged.token)
            const tasks = await props.getTaskPlannerFromBoard(board._id)
            setAllTasksPlanner(tasks)
            setNewTitle('')
            setLoading(true)
        }
    }

    const addUser = () => {
        if(newInvite.trim()){
            inviteUserToBoard(newInvite, board._id)
            setNewInvite('')
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
    }

    const deleteBoard = async () => {
        await props.deleteBoard(board._id, props.userLogged.token)
        props.history.push('/myDesk')
    }

    const editBoard = async () => {
        const response = await props.editBoard(board._id, updateInput, props.userLogged.token)
        setBoard(response)
        setUpdate(false)
    }
    const usersFetch = async () => {
        const users = await props.getUsersFromBoard(idParams)
        const admins = await props.getAdminsFromBoard(idParams)
        setBoardUsers(users)
        setAdmins(admins)
    }

    const userAdmin = async (email) => {
        const admins = await props.userAdmin(email,idParams)
        setAdmins(admins)
        return admins
    }
    

    let imAdmin = props.boardsAdminArray.some(boardId => boardId === String(board._id))
    let imOwner = props.boardsOwnerArray.some(boardId => boardId === String(board._id))


    return (
        <>
            {imOwner && <div>
                {
                    boardUsers.map((user,i) => {
                    if(i){
                        return <UserAdmin key={i} admins={admins} idParams={idParams} userAdmin={userAdmin} user={user}/>
                    }else{
                        return null
                    }
                })

                }
            </div>}
            <div>
                <h1>{board.title}</h1>
                <span>{board.description}</span>
            </div>
            <div>
                {
                    imOwner &&
                    <>
                        <button onClick={deleteBoard}>Delete</button>
                        <button onClick={() => { setUpdate(!update); setUpdateInput({ title: board.title, description: board.description }) }}>{update ? 'Cancel' : 'Edit'}</button>
                        {update &&
                            <>
                                <input type="text" name="title" value={updateInput.title} onChange={readUpdateInput} />
                                <input type="text" name="description" value={updateInput.description} onChange={readUpdateInput} />
                                <button onClick={editBoard}>Send</button>
                            </>
                        }
                    </>

                }
                { (imAdmin || imOwner) && <button onClick={() => setOpenInvite(!openInvite)}>Invite</button>}
                {
                    openInvite && <div>
                        <input onKeyDown={(e) => newInvite.trim() ? enter(e, 'invite') : null} type="text" value={newInvite} onChange={(e) => setNewInvite(e.target.value)} />
                        <button onClick={addUser}>send</button>
                    </div>
                }
            </div>
                <div>
            {(imOwner || imAdmin) &&
                    <>
                        <button onClick={() => setOpen(!open)}>Add list</button>
                        {
                            open && <div>
                                <input onKeyDown={loading ? ((e) => enter(e, 'title')) : null} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                <button onClick={loading ? sendValues : null}>send</button>
                            </div>
                        }
                    </>
            }
                    <div style={{ display: 'flex', margin: '20px' }}>
                        {
                            allTasksPlanner.map(taskplanner => <TaskPlanner imAdmin={imAdmin} imOwner={imOwner} erase={erase} edit={edit} key={taskplanner._id} setAllTasksPlanner={setAllTasksPlanner} taskplanner={taskplanner} />)
                        }
                    </div>
            </div>



        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
        boards: state.boardReducer.boards,
        boardsAdminArray: state.authReducer.boardsAdminArray,
        boardsOwnerArray: state.authReducer.boardsOwnerArray,
        commentsUserArray: state.authReducer.commentsUserArray,
        taskPlannersArray: state.authReducer.taskPlannersArray,
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
    getUsersFromBoard: boardActions.getUsersFromBoard,
    userAdmin: boardActions.userAdmin,
    setUserComponents: authActions.setUserComponents,
    getAdminsFromBoard: boardActions.getAdminsFromBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)