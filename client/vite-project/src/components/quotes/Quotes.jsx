import './Quotes.scss'
import { useEffect, useState } from 'react';
import useQuotes from '../../hooks/useQuotes';
import { useNavigate } from 'react-router-dom';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const { getAllQuotes } = useQuotes();
    const navigate = useNavigate();

    // THIS HANDLE IS HERE DURING DEV
    // BUTTON AND EVENT HANDLER NEED TO BE ABSTRACTED
    const clickHandler = (id) => {
        navigate(`/quotes/${id}`)
    }

    useEffect(() => {

        (async () => {
            const result = await getAllQuotes();
            setQuotes(result);
        })();

    }, [])

    return (
        <section className='quotes-container'>
            <h1>Welcome to my Quotes!</h1>
            <ul>
                {quotes.map(quote => (
                    <div key={quote.id}>
                        <li>{quote.text}{quote.id}</li>
                        <button
                            onClick={() => clickHandler(quote.id)}>
                                Show details
                        </button>
                    </div>
                ))}
            </ul>
        </section>
    )
}

export default Quotes;