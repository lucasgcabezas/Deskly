import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import boardActions from "../redux/actions/boardActions"
import BoardIndividual from '../components/BoardIndividual'
import authActions from '../redux/actions/authActions'
import Nav from "../components/Nav"
import LateralMenu from "../components/LateralMenu"
import NotificationsPanel from "../components/NotificationsPanel"

const MyDesk = (props) => {
    const { userLogged } = props
    const [inputBoard, setInputBoard] = useState({ title: '', description: '', token: '' })
    const [newBoardModal, setNewBoardModal] = useState(false)
    const [menuLateral, setMenuLateral] = useState(false)


    const readInputBoard = (e) => {
        const field = e.target.name
        const value = e.target.value
        setInputBoard({
            ...inputBoard,
            [field]: value,
            token: userLogged.token
        })
    }
    const addBoard = async () => {
        await props.addBoard(inputBoard)
        setNewBoardModal(false)
    }

    useEffect(() => {
        if (userLogged.token) {
            props.setUserComponents(userLogged.token)
        }
        props.getBoardsFromUser(props.userLogged.token)
    }, [])

    // useEffect(() => {props.getBoardsFromUser(props.userLogged.token)}, [])

    let userFirstName = props.userLogged.response ?`${props.userLogged.response.firstName}`: `${userLogged.firstName}`
    let userLastName = props.userLogged.response ? props.userLogged.response.lastName || '' : userLogged.lastName || ''
    let userImg = props.userLogged.response ? props.userLogged.response.img : userLogged.img

    return (
        <div className="myDesk">

            <LateralMenu setMenuLateral={setMenuLateral} menuLateral={menuLateral} />

            <div className="mydeskContainer">
                <div className="headerMyDesk">
                    <span className="hamburguerIcon" onClick={() => setMenuLateral(!menuLateral)}>&#9776; </span>
                    <h2>MyDesk</h2>




                    <div className="userPicName">
                        <span className="userCompleteName">{userLogged.firstName + ' ' + (userLogged.lastName || '')}</span>
                        <div className="userPic" style={{ backgroundImage: `url('${userLogged.img}')` }}></div>
                    </div>

                    <div className="userPicName">
                    <div className="userPic" style={{ backgroundImage: `url('${userImg}')` }}></div>
                    <span className="userCompleteName">{`${userFirstName} ${userLastName}` }</span>
                </div>



                </div>
                <div className="boardsContainerMyDesk">
                    {
                        props.userLogged &&
                        <>
                            {
                                props.boards.map(board => <BoardIndividual key={board._id} board={board} />)
                            }
                            <div className="newBoardButton" onClick={() => setNewBoardModal(true)}>
                                <span className="material-icons-outlined nuevoTableroMas">add_circle_outline</span>
                                <span>New board...</span>
                            </div>
                        </>
                    }
                </div>
            </div>

            <div className="newBoardModal" style={{ display: newBoardModal ? 'flex' : 'none' }}>
                <div className="newBoard"  >
                    <input type="text" name="title" placeholder="Titulo" onChange={readInputBoard} />
                    <textarea name="description" placeholder="Agrega una descripción..." onChange={readInputBoard} ></textarea>
                    <button onClick={addBoard}>Crear nuevo tablero</button>

                    <span onClick={() => setNewBoardModal(false)} className="material-icons-outlined closeNewBoardModal">close</span>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
        boards: state.boardReducer.boards,
    }
}

const mapDispatchToProps = {
    addBoard: boardActions.addBoard,
    getBoardsFromUser: boardActions.getBoardsFromUser,
    setUserComponents: authActions.setUserComponents
}


export default connect(mapStateToProps, mapDispatchToProps)(MyDesk)
