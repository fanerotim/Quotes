import styles from './LastThreeQuotes.module.scss';
import useGetLastThreeQuotes from '../../hooks/useGetLastThreeQuotes';
import LikeCountIcon from '../like-count-icon/LikeCountIcon';
import useLikeRequests from '../../hooks/useLikeRequests';

const LastThreeQuotes = () => {

    const { lastThreeQuotes } = useGetLastThreeQuotes();
    const { getLikesCount } = useLikeRequests();

    return (
        <article
            className={styles.last__three__quotes__container}
        >
            <h1
                className={styles.last__three__quotes__main__heading}
            >
                Most recent quotes
            </h1>
            {lastThreeQuotes.map((quote) => (
                <div
                    key={quote.id}
                    className={styles.last__three__quote__wrapper}
                >

                    <h1
                        className={styles.last__three__quote__text}
                    >
                        {quote.text}
                    </h1>

                    <div
                        className={styles.last__three__quote__author__and__likes__wrapper}
                    >
                        <div
                            className={styles.likes__icon__and__likes__count__container}
                        >
                            <LikeCountIcon
                                className={styles.last__three__quote__likes__icon}
                            />
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