import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'

const UserAdmin = (props) => {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
    const [validationAdmin, setValidationAdmin] = useState([])
    useEffect(() => {
        console.log(props.admins)
        const array = props.admins.map(admin => admin.email)
        console.log(array)
        setValidationAdmin(array)
    }, [props.admins])

    const confirmAdmin = async () => {
        setLoading(false)
        const algo = await props.userAdmin(admin,props.user.email)
        setAdmin(!admin)
        setLoading(true)
    }

    return(
        <div style={{display:"flex", margin:'50px'}}>
            <button onClick={loading ? (() => confirmAdmin()) : null}>
                {validationAdmin.includes(props.user.email) ? 'ADMIN' : 'USUARIO'}
            </button>
            
            <h2>{props.user.firstName + ' ' + props.user.lastName}</h2>
        
        </div>
    )
}
const mapDispatchToProps = {
    getAdminsFromBoard: boardActions.getAdminsFromBoard
}
export default connect(null, mapDispatchToProps)(UserAdmin)