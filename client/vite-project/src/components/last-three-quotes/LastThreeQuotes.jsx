import styles from './LastThreeQuotes.module.scss';
import useGetLastThreeQuotes from '../../hooks/useGetLastThreeQuotes';
import { useNavigate } from 'react-router-dom'
import { CiHeart } from 'react-icons/ci';
import Loader from '../loader/Loader';

const LastThreeQuotes = () => {

    const { lastThreeQuotes } = useGetLastThreeQuotes();
    const navigate = useNavigate();
    const quoteTextLength = 200;

    return (
        <article
            className={styles.last__three__quotes__container}
        >
            <h1
                className={styles.last__three__quotes__main__heading}
            >
                Most recent quotes
            </h1>

            {lastThreeQuotes.length < 1 && <Loader/>}

            {lastThreeQuotes.map((quote) => (
                <div
                    onClick={() => navigate(`/quotes/${quote.id}`)}
                    key={quote.id}
                    className={styles.last__three__quote__wrapper}
                >

                    <h1
                        className={styles.last__three__quote__text}
                    >
                        {quote.text.length > quoteTextLength ? quote.text.substring(0, quoteTextLength) + '... More' : quote.text}
                    </h1>

                    <div
                        className={styles.last__three__quote__author__and__likes__wrapper}
                    >
                        <div
                            className={styles.likes__icon__and__likes__count__container}
                        >
                            <CiHeart
                                className={styles.last__three__quote__likes__icon}
                            />
                            {/* <LikeCountIcon
                                className={styles.last__three__quote__likes__icon}
                            /> */}
                            <p
                                className={styles.last__three__quote__likes__count}
                            >
                                {quote.likes_count}
                            </p>
                        </div>

                        <p
                            className={styles.last__three__quote__author}
                        >
                            {quote.author}
                        </p>
                    </div>

                </div>
            )
            )}
        </article>
    )
}

export default LastThreeQuotes;