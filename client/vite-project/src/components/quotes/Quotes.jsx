import { useState, useEffect } from 'react';
import http from '../../requester/http';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const getQuotes = async () => {
            const result = await http.get(import.meta.env.VITE_QUOTES_URL);
            setQuotes(result);
        }
        getQuotes();
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