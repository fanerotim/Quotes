import styles from './Quotes.module.scss'
import QuoteCard from '../quote-card/QuoteCard';
import LoadMoreQuotes from '../load-more-quotes/LoadMoreQuotes';
import Search from '../search/Search';
import useQuotes from '../../hooks/useQuotes';

const Quotes = () => {

    const {
        quotes,
        mapRefs,
        clickHandler,
    } = useQuotes();

    return (
        <section className={styles.quotes__container}>
            <h1>Welcome to my Quotes!</h1>
            <Search/>
            {quotes?.length > 0 ? (
                <ul className={styles.quotes__list__wrapper}>
                    {quotes.map(quote => (
                        <QuoteCard
                            mapRefs={mapRefs}
                            key={quote.id}
                            quote={quote}
                            onCardClick={() => clickHandler(quote.id)} />
                    ))}
                </ul>)
                : <h1>Currently we do not have quotes to display</h1>}
            <LoadMoreQuotes />
        </section>
    )
}

export default Quotes;