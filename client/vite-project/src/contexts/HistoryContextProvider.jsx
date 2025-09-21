import { useReducer, createContext } from "react";
import { historyReducer } from "../components/reducers/historyReducer";

export const HistoryContext = createContext(null);

const HistoryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(historyReducer, {location: []} )

    return (
        <HistoryContext.Provider
            value={{ ...state, dispatch }}>
            {children}
        </HistoryContext.Provider>
    )
}


export default HistoryContextProvider;