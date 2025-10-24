import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './SessionExpired.module.scss'

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
        <div className={styles.session__expired__container}>

            <div
                className={styles.session__expired__content__container}
            >
                <h1
                    className={styles.session__expired__main__text}
                >
                    Session expired
                </h1>
                <p
                    className={styles.session__expired__secondary__text}
                >
                    Please login again
                </p>
                <button
                    onClick={handleClick}
                    className={styles.session__expired__button}
                >
                    Login again
                </button>
            </div>

        </div>
    )
}

export default SessionExpired;