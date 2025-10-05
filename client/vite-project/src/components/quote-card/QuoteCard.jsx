import styles from './QuoteCard.module.scss';
import { Link } from 'react-router-dom'

const QuoteCard = ({ quote, mapRefs, onCardClick }) => {

    // format quote text to not show in its entirety if it's too long
    const textLength = 80;
    const quoteText = quote.text.length > textLength ? quote.text.substring(0, textLength) + '...' : quote.text;

    return (
        <article
            onClick={() => onCardClick(quote.id)}
            className={styles.card}
            ref={(node) => {
                mapRefs.set(quote.id, node)
            }}>
            <li
                className={styles.card__text}>
                {quoteText}
                {quoteText.length > textLength && <Link className={styles.card__more__btn}>More</Link>}
            </li>

            {/* <button onClick={() => onCardClick(quote.id)}>
                 Show more
            </button> */}

            <h2
                className={styles.card__author}>
                {quote.author}
            </h2>
        </article>
    )
}

export default QuoteCard;