import './Quotes.scss'
import { useEffect, useState } from 'react';
import useQuotes from '../../hooks/useQuotes';
import { useNavigate } from 'react-router-dom';
import QuoteCard from '../quote-card/QuoteCard'

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const { getAllQuotes } = useQuotes();
    const navigate = useNavigate();
    console.log(quotes);
    // THIS HANDLE IS HERE DURING DEV
    // BUTTON AND EVENT HANDLER NEED TO BE ABSTRACTED
    const clickHandler = (id) => {
        navigate(`/quotes/${id}`)
    }

    // TODO: TOO MANY RERENDERS; FIX THIS;
    useEffect(() => {

        (async () => {
            const result = await getAllQuotes();
            setQuotes(result);
        })();

    }, [])

    return (
        <section className='quotes-container'>
            <h1>Welcome to my Quotes!</h1>
            {/* TODO: if no quotes, we get an empty array, so h1 tag below does not render: FIX THIS */}
            {quotes ? (
                <ul>
                    {quotes.map(quote => (
                        <QuoteCard 
                            quote={quote}
                            clickHandler={clickHandler}/>
                    ))}
                </ul>)
                : <h1>Currently we do not have quotes to display</h1>}
        </section>
    )
}

export default Quotes;