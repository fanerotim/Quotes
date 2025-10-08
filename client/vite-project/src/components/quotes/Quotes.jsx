import styles from './Quotes.module.scss'
import QuoteCard from '../quote-card/QuoteCard';
import LoadMoreQuotes from '../load-more-quotes/LoadMoreQuotes';
import Search from '../search/Search';
import useQuotes from '../../hooks/useQuotes';

const Quotes = () => {

    const {
        quotes,
        mapRefs,
        clickHandler
    } = useQuotes();

    return (
        <section className={styles.quotes__container}>
            <div className={styles.quotes__heading__wrapper}>
                <h1
                    className={styles.quotes__heading__wrapper__main}>
                    Quotes
                </h1>
                <h2
                    className={styles.quotes__heading__wrapper__secondary}>
                    Browse through a catalog of amazing quotes
                </h2>
            </div>
            <Search />
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
                : <h1>No quotes found</h1>}
            {quotes?.length > 0 && <LoadMoreQuotes
                className={styles.load__more__button} />}
        </section>
    )
}

export default Quotes;