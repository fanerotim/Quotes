import { createContext, useState } from "react";

export const QuoteContext = createContext();

export const QuoteContextProvider = ({ children }) => {

    const [quotes, setQuotes] = useState([]);

    const updateQuotes = (newQuotes) => {
        setQuotes((oldQuotes) => [...oldQuotes, ...newQuotes]);
    }

    return (
        <QuoteContext.Provider
            value={{quotes, updateQuotes}}>
            {children}
        </QuoteContext.Provider>
    )
}