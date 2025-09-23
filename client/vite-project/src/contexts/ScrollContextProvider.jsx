import { createContext, useState } from "react";

export const ScrollContext = createContext(null);

const ScrollContextProvider = ({ children }) => {

    const [itemId, setItemId] = useState(0);

    const updateItemId = (id) => {
        setItemId((oldId) => id);
    }

    return (
        <ScrollContext.Provider
            value={{ itemId, updateItemId }}>
            {children}
        </ScrollContext.Provider>
    )
}

export default ScrollContextProvider;