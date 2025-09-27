import { createContext, useState } from "react";
import { useEffect } from "react";
import useInitialQuotes from "../hooks/useInitialQuotes";

const { getInitialQuotes } = useInitialQuotes();

export const QuoteContext = createContext();

export const QuoteContextProvider = ({ children }) => {

    // everything works now apart from setting initial quotes. it was overriding setting new quotes;
    const [quotes, setQuotes] = useState([]);

    const updateQuotes = (newQuotes) => {
        setQuotes(newQuotes);
    }

    useEffect(() => {
        const quotesInLocalStorage = JSON.parse(localStorage.getItem('quotes'));

        if (!quotesInLocalStorage) {
            getInitialQuotes();
        }

        setQuotes(quotesInLocalStorage);
    }, [])

    return (
        <QuoteContext.Provider
            value={{ quotes, updateQuotes }}>
            {children}
        </QuoteContext.Provider>
    )
}