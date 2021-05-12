import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import boardActions from "../redux/actions/boardActions"
import BoardIndividual from '../components/BoardIndividual'
import Board from "../components/Board"
const MyDesk = (props) => {
    const [title, setTitle] = useState()
    const [idBoard, setIdBoard] = useState({})
    const description = "descripcion generica"
    const [boards, setBoards] = useState([])
    const inputAdd = e => {
        var value = e.target.value
        var prop = e.target.name
        setTitle(
            value           
        )
    }
    const  add = async () => {
       await props.addBoard(title,description,props.userLogged.token)
    }
    const inputDelete = e => {
        var valueId = e.target.value
        var propId = e.target.name
        setIdBoard({
            ...idBoard,
            [propId]: valueId,
        })
    }
    const  deletee = async () => {
        console.log(idBoard)
        props.deleteBoard(idBoard)
    }
    const edit = () => {
        props.editBoard(idBoard, title  )
    }
    const get = async() =>{        
        const response = await props.getBoards(props.userLogged.token)
        setBoards(response)
    }
    useEffect(() => {
        get()
    },[])
    return ( 
        <div>
            <h1>soy myDesk</h1>
            {props.userLogged &&
            <>
                <h1>Estas logueado con  {props.userLogged ? props.userLogged.firstName : "nadie"} </h1>
                <input type="text" name="title" placeholder="nombre" onChange={inputAdd}/>
                <button  onClick={add} > <h2>Crear</h2></button>
                <input type="text" name="idBoard" placeholder="id" onChange={inputDelete}/>
                <button  onClick={deletee} > <h2>Borrar</h2></button> 
                <button onClick={edit}><h2>editBoard</h2></button>
                {
                    boards.map(board => {
                    return (
                        <>
                            <BoardIndividual key={board._id} board={board}/> 
                            <Board board={board}/>
                        </>
                    )
                    })
                }
                
            </>
            }
        </div>
        );
}
 
const mapStateToProps= state =>{
    return{ 
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps= {   
    addBoard: boardActions.addBoard,
    deleteBoard:boardActions.deleteBoard,
    editBoard:boardActions.editBoard,
    getBoards:boardActions.getBoards
}


export default connect(mapStateToProps, mapDispatchToProps)(MyDesk)
