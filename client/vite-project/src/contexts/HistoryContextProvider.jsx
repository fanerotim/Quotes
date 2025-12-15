import { useReducer, createContext } from "react";
import { historyReducer } from "../reducers/historyReducer";

export const HistoryContext = createContext(null);

const HistoryContextProvider = ({ children }) => {
    // the '/' route is a fallback / default value if location [] is empty
    const [state, dispatch] = useReducer(historyReducer, { routes: ['/'] })

    return (
        <HistoryContext.Provider
            value={{ ...state, dispatch }}>
            {children}
        </HistoryContext.Provider>
    )
}


export default HistoryContextProvider;