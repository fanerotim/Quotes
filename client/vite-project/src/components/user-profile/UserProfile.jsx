import styles from './UserProfile.module.scss'
import UpdatePassword from './update-password/UpdatePassword';
import { Link } from 'react-router-dom';
import useGetUserQuotes from '../../hooks/useGetUserQuotes';

const UserProfile = () => {

    const { email, userQuotes } = useGetUserQuotes();

    return (
        <section 
            className={styles.page__wrapper}
        >

            {email && 
            <p
                className={styles.profile__page__welcome__message}
            >
                Welcome, {email}!
            </p>
            }

            <UpdatePassword />

            <h1
                className={styles.profile__page__heading}    
            >
                Please find the quotes you have added below
            </h1>

            {userQuotes?.map((quote) => (
                <div 
                    className={styles.quote__container} key={quote.id}
                >
                    <h1>{quote.author}</h1>
                    <p 
                        className={styles.quote__container__quote__text}
                    >
                        {quote.text}
                    </p>
                    <h4 
                        className={styles.quote__container__category}
                    >
                        {quote.category}
                    </h4>
                    <Link to={`/quotes/${quote.id}`}>Modify or Delete</Link>
                </div>
            ))}
        </section>
    )
}

export default UserProfile;