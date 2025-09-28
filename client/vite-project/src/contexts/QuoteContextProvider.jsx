import { createContext, useState } from "react";
import { useEffect } from "react";
import useLocalStorageQuotes from "../hooks/useLocalStorageQuotes";

const { 
    setInitialQuotesInLocalStorage,
    getQuotesFromLocalStorage } 
    = useLocalStorageQuotes();

export const QuoteContext = createContext();

export const QuoteContextProvider = ({ children }) => {

    // everything works now apart from setting initial quotes. it was overriding setting new quotes;
    const [quotes, setQuotes] = useState([]);

    const updateQuotes = (newQuotes) => {
        setQuotes(newQuotes);
    }

    useEffect(() => {
        const currentQuotesInLocalStorage = getQuotesFromLocalStorage();

        if (!currentQuotesInLocalStorage) {
            setInitialQuotesInLocalStorage();
        }
        
        setQuotes(currentQuotesInLocalStorage);
        
    }, [])

    return (
        <QuoteContext.Provider
            value={{ quotes, updateQuotes }}>
            {children}
        </QuoteContext.Provider>
    )
}