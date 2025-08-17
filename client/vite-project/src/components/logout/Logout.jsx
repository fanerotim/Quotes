import { useAuthContext } from '../../hooks/useAuthContext';
import './Logout.scss'
import { useNavigate } from "react-router-dom";

export const Logout = () => {

    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/')
    }

    return (
        <button
            onClick={handleLogout}
            className="logout">
            Logout
        </button>
    )
}

export default Logout;
