import { useDispatch } from 'react-redux'
import authService from '../../database/auth'
import { logout } from '../../Redux/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='nav-link'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn