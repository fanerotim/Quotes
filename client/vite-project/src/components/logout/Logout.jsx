import './Logout.scss'
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
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
