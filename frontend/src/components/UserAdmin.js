import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'

const UserAdmin = (props) => {
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        confirmAdmin()
    }, [])

    const confirmAdmin = () => {
        props.user.admin = false
        props.admins.map( admin => {
            if(admin.email === props.user.email){
                props.user.admin = true
                setAdmin(true)
            }
        })
    }

    return(
        <div style={{display:"flex"}}>
            <button onClick={() =>{props.userAdmin(!admin,props.user.email); setAdmin(!admin)}}>
                {admin ? 'es admin' : 'no es admin'}
            </button>
            
            <h2>{'Admin ' + props.user.firstName + ' ' + props.user.lastName}</h2>
        
        </div>
    )
}
const mapDispatchToProps = {
    getAdminsFromBoard: boardActions.getAdminsFromBoard
}
export default connect(null, mapDispatchToProps)(UserAdmin)