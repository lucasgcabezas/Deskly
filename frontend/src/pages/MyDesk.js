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
    const [loading, setLoading] = useState(true)
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
        setLoading(false)
        await props.addBoard(inputBoard) 
        setNewBoardModal(false)
        setLoading(true)
    }

    useEffect(() => {
        props.getBoardsFromUser(userLogged.token)

        const reloadTaskPlanner = setInterval(() => {
            if (userLogged.token) {
                props.setUserComponents(userLogged.token)
                props.getBoardsFromUser(userLogged.token)
            }

        }, 1000)

        return () => { clearInterval(reloadTaskPlanner) }
        // if (userLogged.token) {
        //     props.setUserComponents(userLogged.token)
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="myDesk">
            <NotificationsPanel />

            <LateralMenu setMenuLateral={setMenuLateral} menuLateral={menuLateral} />

            <div className="mydeskContainer">

                <div className="headerMyDesk">
                    <span className="hamburguerIcon" onClick={() => setMenuLateral(!menuLateral)}>&#9776; </span>
                    {/* <span className="hamburguerIcon" onClick={() => setMenuLateral(!menuLateral)}>&#x2630; </span> */}
                    <div className="newBoardButton" onClick={() => setNewBoardModal(true)}>
                        <span className="material-icons-outlined nuevoTableroMas">add_circle_outline</span>
                        <span>Añadir tablero...</span>
                        
                    </div>
                </div>

                <div className="boardsContainerMyDesk">

                    {/* <h1>soy myDesk</h1> */}
                    {props.userLogged &&
                        <>
                            {/* <h1>Estas logueado con  {props.userLogged ? props.userLogged.firstName : "nadie"} </h1> */}

                            {/* {
                                props.boards.map(board => <BoardIndividual key={board._id} board={board} />)
                            } */}

                            <h2>Propietario de...</h2>
                            {
                                props.boardsOwnerArray.map(board => <BoardIndividual  key={board} board={board} />)
                            }
                            <h2>Administrador de...</h2>
                            {
                                props.boardsAdminArray.map(board => <BoardIndividual  key={board} board={board} />)

                            }
                            <h2>Usuario de...</h2>
                            {
                                props.boardsUserArray.map(board => <BoardIndividual  key={board} board={board} />)

                            }

                            <div className="newBoardModal" style={{ display: newBoardModal ? 'flex' : 'none' }}>
                                <div className="newBoard"  >
                                    <input type="text" name="title" placeholder="title" onChange={readInputBoard} />
                                    <input type="text" name="description" placeholder="description..." onChange={readInputBoard} />
                                    <button onClick={loading && addBoard}>Create a new board</button>

                                    <span onClick={() => setNewBoardModal(false)} className="closeNewBoardModal">X</span>
                                </div>
                            </div>


                            {/* <h2>owner of...</h2> */}
                            {/* 
                <button style={{margin:"0rem 0rem 2rem 1rem "}}  onClick={() => props.setUserComponents(userLogged.token)}>Cargar redux</button>
            <button style={{margin:"0rem 0rem 2rem 1rem "}}  onClick={() =>console.log(props.components)}>Console.log</button> */}


                        </>
                    }
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
        boards: state.boardReducer.boards,
        boardsAdminArray: state.authReducer.boardsAdminArray,
        boardsOwnerArray: state.authReducer.boardsOwnerArray,
        boardsUserArray: state.authReducer.boardsUserArray
    }
}

const mapDispatchToProps = {
    addBoard: boardActions.addBoard,
    getBoardsFromUser: boardActions.getBoardsFromUser,
    setUserComponents: authActions.setUserComponents
}


export default connect(mapStateToProps, mapDispatchToProps)(MyDesk)
