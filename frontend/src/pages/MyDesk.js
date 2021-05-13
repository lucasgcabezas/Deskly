import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import boardActions from "../redux/actions/boardActions"
import BoardIndividual from '../components/BoardIndividual'

const MyDesk = (props) => {
    const {userLogged, boards} = props
    const [title, setTitle] = useState()
    const [idBoard, setIdBoard] = useState({})
    const [inputBoard, setInputBoard] = useState({ title: '', description:'', token: '' })
    // const inputAdd = e => {
    //     var value = e.target.value
    //     var prop = e.target.name
    //     setTitle(
    //         value           
    //     )
    // }
    const readInputBoard = (e) => {
        const field = e.target.name
        const value = e.target.value
        setInputBoard({
            ...inputBoard,
            [field]: value,
            token: userLogged.token
        })
        // console.log(inputBoard)
    }
    const addBoard = async () => {
       await props.addBoard(inputBoard)
    }
    useEffect(() => {
        props.getBoards(props.userLogged.token)
    },[])
    return ( 
        <div>
            <h1>soy myDesk</h1>
            {props.userLogged &&
            <>
                <h1>Estas logueado con  {props.userLogged ? props.userLogged.firstName : "nadie"} </h1>
                <div style={{border: "1px solid black", width: "40vw", display:"flex"}}>
                    <input type="text" name="title" placeholder="title" onChange={readInputBoard}/>
                    <input type="text" name="description" placeholder="description..." onChange={readInputBoard}/>
                    <button onClick={addBoard} >Create a new board</button>
                </div>
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
        boards: state.boardReducer.boards
    }
}

const mapDispatchToProps= {   
    addBoard: boardActions.addBoard,
    getBoards:boardActions.getBoards
}


export default connect(mapStateToProps, mapDispatchToProps)(MyDesk)
