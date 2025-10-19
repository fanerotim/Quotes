import styles from './LastThreeQuotes.module.scss';
import useGetLastThreeQuotes from '../../hooks/useGetLastThreeQuotes';
import LikeCountIcon from '../like-count-icon/LikeCountIcon';

const LastThreeQuotes = () => {

    const { lastThreeQuotes } = useGetLastThreeQuotes();

    return (
        <article
            className={styles.last__three__quotes__container}
        >
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
                        <LikeCountIcon
                            className={styles.last__three__quote__likes__icon}
                        />
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