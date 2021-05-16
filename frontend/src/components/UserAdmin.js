import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'

const UserAdmin = (props) => {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        const array = props.admins.map(admin => admin.email)
        if(array.indexOf(props.user.email) !== -1){
            setAdmin(false)
        }else{
            setAdmin(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.admins])

    const confirmAdmin = async () => {
        setLoading(false)
        await props.userAdmin(props.user.email)
        setAdmin(!admin)
        setLoading(true)
    }

    return(
        <div style={{display:"flex", margin:'50px'}}>
            <button onClick={loading ? (() => confirmAdmin()) : null}>
                {admin ? 'ADMIN' : 'USUARIO'}
            </button>
            
            <h2>{'Admin ' + props.user.firstName + ' ' + (props.user.lastName === null ? '' : props.user.lastName)}</h2>
        
        </div>
    )
}
const mapDispatchToProps = {
    getAdminsFromBoard: boardActions.getAdminsFromBoard
}
export default connect(null, mapDispatchToProps)(UserAdmin)