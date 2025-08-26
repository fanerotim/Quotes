import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import './SessionExpired.scss'

const SessionExpired = () => {

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        // dispatch LOGOUT event;
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/users/login')
    }

    return (
        <div className='session-expired__container'>
            <h1>Session Expired! Please login again</h1>
            <button onClick={handleClick}>Login again</button>
        </div>
    )
}

export default SessionExpired;