import { createContext, useState } from "react";
import { useEffect } from "react";
import useInitialQuotes from "../hooks/useInitialQuotes";

const { getInitialQuotes } = useInitialQuotes();
const initialQuotes = getInitialQuotes();

export const QuoteContext = createContext();

export const QuoteContextProvider = ({ children }) => {

    // everything works now apart from setting initial quotes. it was overriding setting new quotes;
    const [quotes, setQuotes] = useState(initialQuotes);

    const updateQuotes = (newQuotes) => {
        setQuotes(newQuotes);
    }

    useEffect(() => {
        const quotesInLocalStorage = JSON.parse(localStorage.getItem('quotes'));
        setQuotes(quotesInLocalStorage);
    }, [])

    return (
        <QuoteContext.Provider
            value={{ quotes, updateQuotes }}>
            {children}
        </QuoteContext.Provider>
    )
}