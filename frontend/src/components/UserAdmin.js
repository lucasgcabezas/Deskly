import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import boardActions from '../redux/actions/boardActions'

const UserAdmin = (props) => {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const array = props.admins.map(admin => admin.email)
        if (array.indexOf(props.user.email) !== -1) {
            setAdmin(false)
        } else {
            setAdmin(true)
        }
    }, [props.admins])

    const confirmAdmin = async () => {
        setLoading(false)
        await props.userAdmin(props.user.email)
        setAdmin(!admin)
        setLoading(true)
    }
    const usersVisible = () => {
        setVisible(!visible)
    }
    return (
        <>
            <div onClick={usersVisible} className="iconoVisible">
                <span class="material-icons-outlined iconoUsers">people_outline</span>
            </div>
            {visible &&
                <div className="ventanaUser">
                    <div>
                        <h3>{props.user.firstName + ' ' + (props.user.lastName === null ? '' : props.user.lastName)}</h3>
                        <button className="buttonUserAdmin" onClick={loading ? (() => confirmAdmin()) : null}>{admin ? 'ADMIN' : 'USER'}</button>
                    </div>

                </div>
            }
        </>
    )
}
const mapDispatchToProps = {
    getAdminsFromBoard: boardActions.getAdminsFromBoard
}
export default connect(null, mapDispatchToProps)(UserAdmin)