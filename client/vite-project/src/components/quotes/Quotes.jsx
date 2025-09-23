import './Quotes.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuotes from '../../hooks/useQuotes';
import QuoteCard from '../quote-card/QuoteCard';
import useScroll from '../../hooks/useScroll';
import useScrollContext from '../../hooks/useScrollContext';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const { getAllQuotes } = useQuotes();

    const { createMap, scrollToItem } = useScroll();
    const mapRefs = createMap();
    const { itemId, updateItemId } = useScrollContext();

    const navigate = useNavigate();

    const clickHandler = (id) => {
        updateItemId(id)
        navigate(`/quotes/${id}}`)
    }

    // TODO: TOO MANY RERENDERS; FIX THIS;
    useEffect(() => {

        (async () => {
            const result = await getAllQuotes();
            setQuotes(result);
            scrollToItem(itemId);
        })();

    }, [])

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
                            onCardClick={clickHandler} />
                    ))}
                </ul>)
                : <h1>Currently we do not have quotes to display</h1>}
        </section>
    )
}

export default Quotes;