import styles from './UserProfile.module.scss'
import UpdatePassword from './update-password/UpdatePassword';
import { Link } from 'react-router-dom';
import useGetUserQuotes from '../../hooks/useGetUserQuotes';
import Loader from '../loader/Loader';

const UserProfile = () => {

    const { email, userQuotes } = useGetUserQuotes();
    // this variable controls the length of the quote that will be visible before a card is opened - helps avoid having huge cards 
    const quoteTextLength = 250;

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
                {
                    userQuotes?.length == 0
                        ?
                        <div
                            className={styles.loader__container}
                        >
                            <Loader />
                        </div>
                        :
                        <>
                            {userQuotes?.map((quote) => (
                                <div
                                    className={styles.quote__card__wrapper}
                                    key={quote.id}
                                >

                                    <p
                                        className={styles.quote__card__wrapper__quote__text}
                                    >
                                        {quote.text.length > quoteTextLength ? quote.text.substring(0, quoteTextLength) + '...' : quote.text}
                                    </p>

                                    <div
                                        className={styles.quote__card__author__and__nav__button__container}
                                    >

                                        <Link
                                            to={`/quotes/${quote.id}`}
                                            className={styles.quote__card__wrapper__navigation__button}
                                        >
                                            Review
                                        </Link>

                                        <p
                                            className={styles.quote__card__wrapper__quote__author}
                                        >
                                            {quote.author}
                                        </p>

                                    </div>
                                </div>
                            ))}
                        </>
                }
            </div>
        </section>
    )
}

export default UserProfile;