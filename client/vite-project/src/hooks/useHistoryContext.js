import { useContext } from "react";
import { HistoryContext } from "../contexts/HistoryContextProvider";

export const useHistoryContext = () => {
    const context = useContext(HistoryContext);

    if (!context) {
        throw Error('HistoryContext must be used inside HistoryContextProvider')
    }

    return context;
}