import styles from './UserProfile.module.scss';
import UpdatePassword from './update-password/UpdatePassword';
import { Link } from 'react-router-dom';
import useGetUserQuotes from '../../hooks/useGetUserQuotes';
import Loader from '../loader/Loader';

const UserProfile = () => {

    const { email, userQuotes, isFetched } = useGetUserQuotes();
    // this variable controls the length of the quote that will be visible before a card is opened - helps avoid having huge cards 
    const quoteTextLength = 150;

    return (
        <section
            className={styles.page__wrapper}
        >

            <div
                className={styles.profile__page__main__text__container}
            >
                <h1
                    className={styles.profile__page__main__text__container__heading}
                >
                    Profile
                </h1>

                <p
                    className={styles.profile__page__main__text__container__subheading}
                >
                    On this page you can manage your profile - browse through quotes you have added or liked, update password and more
                </p>
            </div>


            {/* {email &&
                <div
                    className={styles.profile__page__welcome__message__container}
                >

                    <p
                        className={styles.profile__page__welcome__message}
                    >
                        Oi,
                    </p>

                    <span
                        className={styles.profile__page__welcome__message__email}
                    >
                        {email} - welcome to your profile page
                    </span>
                </div>} */}

            <div
                className={styles.profile__page__update__password__container}
            >
                <UpdatePassword />
            </div>

            <h1
                className={styles.profile__page__quote__card__container__heading}
            >
                Quotes you added
            </h1>

            <div
                className={styles.quote__card__container}
            >
                {
                    userQuotes?.length == 0
                        ?
                        isFetched
                            ?
                            <h1
                                className={styles.no__quotes__added__message}
                            >
                                You have not added a quote yet
                            </h1>
                            :
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