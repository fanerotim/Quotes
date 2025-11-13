import styles from './Logout.module.scss';
import { useNavigate } from "react-router-dom";
import useLogout from '../../hooks/useLogout';

export const Logout = () => {

    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleLogout = async () => {

        try {
            await logout();
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <button
            onClick={handleLogout}
            className={styles.logout__btn}
        >
            Logout
        </button>
    )
}

export default Logout;
