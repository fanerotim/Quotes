import { useContext } from "react";
import { QuoteContext } from "../contexts/QuoteContextProvider";

const useQuoteContext = () => {

    const context = useContext(QuoteContext);

    if (!context) {
        throw error('Quote context must be used inside Quote Context Provider')
    }

    return context;
}

export default useQuoteContext;