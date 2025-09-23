import { useContext } from "react";
import { ScrollContext } from "../contexts/ScrollContextProvider";

const useScrollContext = () => {
    const context = useContext(ScrollContext);

    if (!context) {
        throw Error('ScrollContext must be used inside ScrollContextProvider');
    }

    return context;
}

export default useScrollContext;