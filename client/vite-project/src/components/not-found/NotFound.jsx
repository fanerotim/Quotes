import styles from '../not-found/NotFound.module.scss';
import globalStyles from '../../App.module.scss';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <section
            className={styles.not__found__page__wrapper}
        >
            <h1
                className={styles.not__found__page__text}
            >
                Not Found
            </h1>

            <Link
                to={'/'}
                className={globalStyles.submit__button}
            >
                Home
            </Link>
        </section>
    )
}

export default NotFound;