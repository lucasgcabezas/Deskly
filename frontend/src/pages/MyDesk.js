import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import boardActions from "../redux/actions/boardActions"
import BoardIndividual from '../components/BoardIndividual'
import authActions from '../redux/actions/authActions'
import Nav from "../components/Nav"

const MyDesk = (props) => {
    const { userLogged } = props
    const [inputBoard, setInputBoard] = useState({ title: '', description: '', token: '' })
    const [newBoardModal, setNewBoardModal] = useState(false)
    const [menuLateral, setMenuLateral] = useState(false)

    let classMenuLateral = menuLateral ? 'lateralMenuOpen' : 'lateralMenuClose'

    const readInputBoard = (e) => {
        const field = e.target.name
        const value = e.target.value
        setInputBoard({
            ...inputBoard,
            [field]: value,
            token: userLogged.token
        })
    }
    const addBoard = async () => { await props.addBoard(inputBoard) }

    useEffect(() => {
        if (userLogged.token) {
            props.setUserComponents(userLogged.token)
        }
        props.getBoardsFromUser(props.userLogged.token)
    }, [])

    // useEffect(() => {props.getBoardsFromUser(props.userLogged.token)}, [])

    return (
        <div className="myDesk">
            <div className={classMenuLateral}>
                <span className="fas fa-bars"></span>
                {/* <button onClick={() => setMenuLateral(!menuLateral)}>Open</button> */}
                <span className="hamburguerIcon" onClick={() => setMenuLateral(!menuLateral)}>&#9776; </span>
                
                <div className="menuLateralInfo" style={{ display: menuLateral ? 'flex' : 'none' }}>
                    <div className="userPic" style={{ backgroundImage : `url('${userLogged.img}')`}}></div>
                    <span className="userCompleteName">{userLogged.firstName + ' ' + (userLogged.lastName || '')}</span>
                    <Nav />

                </div>
            </div>

            <div className="mydeskContainer">
                {/* <h1>soy myDesk</h1> */}
                {props.userLogged &&
                    <>
                        {/* <h1>Estas logueado con  {props.userLogged ? props.userLogged.firstName : "nadie"} </h1> */}

                        {
                            props.boards.map(board => <BoardIndividual key={board._id} board={board} />)
                        }

                        <div className="newBoardButton" onClick={() => setNewBoardModal(true)}>
                            Agregar nuevo tablero...
                    </div>
                        <div className="newBoardModal" style={{ display: newBoardModal ? 'flex' : 'none' }}>
                            <div className="newBoard"  >
                                <input type="text" name="title" placeholder="title" onChange={readInputBoard} />
                                <input type="text" name="description" placeholder="description..." onChange={readInputBoard} />
                                <button onClick={addBoard}>Create a new board</button>
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
