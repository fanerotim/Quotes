import './Quotes.scss'
import QuoteCard from '../quote-card/QuoteCard';
import LoadMoreQuotes from '../load-more-quotes/LoadMoreQuotes';
import useQuotes from '../../hooks/useQuotes';

const Quotes = () => {

    const { 
        quotes, 
        mapRefs, 
        clickHandler 
    } = useQuotes();

    return (
        <section className='quotes-container'>
            <h1>Welcome to my Quotes!</h1>
            {/* TODO: if no quotes, we get an empty array, so h1 tag below does not render: FIX THIS */}
            {quotes ? (
                <ul className='quotes_wrapper'>
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