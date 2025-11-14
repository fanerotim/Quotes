import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './SessionExpired.module.scss'
import globalStyles from '../../App.module.scss';
import { useEffect } from 'react';

const SessionExpired = () => {

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    // TODO: think if the useEffect is needed, i can potentially update overflowY of body on click in the below clickHandler
    useEffect(() => {
        // make sure page cannot be scrolled when modal pops up
        const bodyElement = document.querySelector('body');
        bodyElement.style.overflowY = 'hidden';

        //on unmount make sure body can be scrolled again
        return () => {
            bodyElement.style.overflowY = 'scroll';
        }
    }, [])

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
                    className={globalStyles.submit__button}
                >
                    Login again
                </button>
            </div>

        </div>
    )
}

export default SessionExpired;