import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import boardActions from "../redux/actions/boardActions"
import BoardIndividual from '../components/BoardIndividual'
import authActions from '../redux/actions/authActions'

const MyDesk = (props) => {
    const {userLogged} = props
    const [inputBoard, setInputBoard] = useState({ title: '', description:'', token: '' })

    const readInputBoard = (e) => {
        const field = e.target.name
        const value = e.target.value
        setInputBoard({
            ...inputBoard,
            [field]: value,
            token: userLogged.token
        })
    }
    const addBoard = async () => {await props.addBoard(inputBoard)}

    useEffect(() => {
        if (userLogged.token) {
            props.setUserComponents(userLogged.token)
        }
        props.getBoardsFromUser(props.userLogged.token)
    }, [])

    // useEffect(() => {props.getBoardsFromUser(props.userLogged.token)}, [])

    return ( 
        <div>
            <h1>soy myDesk</h1>
            {props.userLogged &&
            <>
                <h1>Estas logueado con  {props.userLogged ? props.userLogged.firstName : "nadie"} </h1>
                <div style={{border: "1px solid black", width: "40vw", display:"flex"}}>
                    <input type="text" name="title" placeholder="title" onChange={readInputBoard}/>
                    <input type="text" name="description" placeholder="description..." onChange={readInputBoard}/>
                    <button onClick={addBoard}>Create a new board</button>
                </div>
                <h2>owner of...</h2>

                <button style={{margin:"0rem 0rem 2rem 1rem "}}  onClick={() => props.setUserComponents(userLogged.token)}>Cargar redux</button>
                <button style={{margin:"0rem 0rem 2rem 1rem "}}  onClick={() =>console.log(props.components)}>Console.log</button>
                {
                    props.boards.map(board => <BoardIndividual key={board._id} board={board}/>)
                }
            </>
            }
        </div>
        );
}
 
const mapStateToProps= state =>{
    return{ 
        userLogged: state.authReducer.userLogged,
        boards: state.boardReducer.boards,
    }
}

const mapDispatchToProps= {   
    addBoard: boardActions.addBoard,
    getBoardsFromUser:boardActions.getBoardsFromUser,
    setUserComponents: authActions.setUserComponents
}


export default connect(mapStateToProps, mapDispatchToProps)(MyDesk)
