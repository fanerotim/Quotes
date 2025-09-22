import './Quotes.scss'
import { useEffect, useRef, useState } from 'react';
import useQuotes from '../../hooks/useQuotes';
import { useNavigate } from 'react-router-dom';
import QuoteCard from '../quote-card/QuoteCard'

// give it default value;
let selectedQuoteId = 0;

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const { getAllQuotes } = useQuotes();
    const navigate = useNavigate();

    const quoteCardRefs = useRef(null);

    if (!quoteCardRefs.current) {
        quoteCardRefs.current = new Map();
    }

    // THIS HANDLE IS HERE DURING DEV
    // BUTTON AND EVENT HANDLER NEED TO BE ABSTRACTED
    const clickHandler = (id) => {

        selectedQuoteId = id;

        navigate({
            pathname: `/quotes/${id}}`
        })
    }

    // TODO: TOO MANY RERENDERS; FIX THIS;
    useEffect(() => {

        (async () => {
            const result = await getAllQuotes();
            setQuotes(result);

            quoteCardRefs.current.get(selectedQuoteId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
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
                            quoteCardRefs={quoteCardRefs.current}
                            key={quote.id}
                            quote={quote}
                            clickHandler={clickHandler} />
                    ))}
                </ul>)
                : <h1>Currently we do not have quotes to display</h1>}
        </section>
    )
}

export default Quotes;