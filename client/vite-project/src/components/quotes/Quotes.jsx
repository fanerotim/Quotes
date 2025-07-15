import { useEffect, useState } from 'react';
import useQuotes from '../../hooks/useQuotes';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const { getAllQuotes } = useQuotes();

    useEffect(() => {

        (async () => {
            const result = await getAllQuotes();
            setQuotes(result);
        })();

    }, [quotes])

    return (
        <>
            <h1>Welcome to my Quotes!</h1>
            <ul>
                {quotes.map(quote => (
                    <li key={quote.id}>{quote.text}</li>
                ))}
            </ul>
        </>
    )
}

export default Quotes;