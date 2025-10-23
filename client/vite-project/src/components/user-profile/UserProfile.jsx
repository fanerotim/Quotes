import styles from './UserProfile.module.scss'
import UpdatePassword from './update-password/UpdatePassword';
import { Link } from 'react-router-dom';
import useGetUserQuotes from '../../hooks/useGetUserQuotes';
import Loader from '../loader/Loader';

const UserProfile = () => {

    const { email, userQuotes } = useGetUserQuotes();

    return (
        <section
            className={styles.page__wrapper}
        >

            {email &&
                <div
                    className={styles.profile__page__welcome__message__container}
                >

                    <p
                        className={styles.profile__page__welcome__message}
                    >
                        Welcome,
                    </p>

                    <span
                        className={styles.profile__page__welcome__message__email}
                    >
                        {email}
                    </span>

                    <p
                        className={styles.profile__page__welcome__message__info}
                    >
                        Here you can review and edit your quotes, the quotes you liked and update your password.
                    </p>
                </div>}

            <div
                className={styles.profile__page__update__password__container}
            >
                <UpdatePassword />
            </div>

            <h1
                className={styles.profile__page__heading}
            >
                Your quotes in one place
            </h1>

            <div
                className={styles.quotes__container} 
            >
                {userQuotes?.map((quote) => (
                    <div
                        className={styles.quote__wrapper} 
                        key={quote.id}
                    >
                        <h1
                            className={styles.quote__wrapper__quote__author}
                        >
                            {quote.author}
                        </h1>
                        <p
                            className={styles.quote__wrapper__quote__text}
                        >
                            {quote.text}
                        </p>
                        <h4
                            className={styles.quote__wrapper__category}
                        >
                            {quote.category}
                        </h4>
                        <Link 
                            to={`/quotes/${quote.id}`}
                        >
                            Review
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default UserProfile;