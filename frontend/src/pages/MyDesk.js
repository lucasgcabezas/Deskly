import React, {useState} from "react"
import {connect} from "react-redux"
import boardActions from "../redux/actions/boardActions"


const MyDesk = (props) => {

    const [title, setTitle] = useState()
    const [idBoard, setIdBoard] = useState({})
    const description = "descripcion generica"
    const inputAdd = e => {
        var value = e.target.value
        var prop = e.target.name
       
        console.log(prop,value)
        setTitle(
             value           
        )
    }

    const  add = async () => {
        console.log(title)
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
        console.log("hola")
        props.editBoard(idBoard, title  )
    }

    const get = async() =>{        
     const response = await props.getBoards(props.userLogged.token)
      console.log(response)
    }


    return ( <>
        <h1>soy myDesk</h1>
        {props.userLogged &&<>
        <h1>Estas logueado con  {props.userLogged?props.userLogged.firstName:"nadie"} </h1>
        <input type="text" name="title" placeholder="nombre" onChange={inputAdd}/>
        <button  onClick={add} > <h2>Crear</h2></button>
        <input type="text" name="idBoard" placeholder="id" onChange={inputDelete}/>
        <button  onClick={deletee} > <h2>Borrar</h2></button> 
        <button onClick={edit}><h2>editBoard</h2></button>
        <button onClick={get}><h2>get</h2></button>
        </>
        }
        </>
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
