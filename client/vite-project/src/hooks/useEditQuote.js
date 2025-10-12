import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEditQuoteRequest from './useEditQuoteRequest';
import useGetQuote from './useGetQuote';
import useLogoutOn401Error from './useLogoutOn401Error';
import useLocalStorageQuotes from './useLocalStorageQuotes';
import validateInputs from '../utils/validateInputs';

const useEditQuote = () => {
    const [quote, setQuote] = useState(null);
    
    const navigate = useNavigate();
    const { quoteId } = useParams();
    
    const { getQuote } = useGetQuote();
    const { edit } = useEditQuoteRequest();
    const { logoutOn401 } = useLogoutOn401Error();
    const { updateLocalStorageQuotesAfterEdit } = useLocalStorageQuotes();


    useEffect(() => {
        // get data of quote we want to edit
        getQuote(quoteId)
            .then(data => setQuote(data))
            .catch(err => console.error(err))
    }, []);

    const handleSubmit = async (e, values) => {
        e.preventDefault();

        try {
            validateInputs(values);
            await edit(values, quoteId);
            updateLocalStorageQuotesAfterEdit({ id: quoteId, ...values });
            navigate(`/quotes/${quoteId}`)
        } catch (err) {
            // if err, check for 401 and logout user if so
            logoutOn401(err);
            throw err;
        }
    }

    return {
        handleSubmit,
        quote
    }
}

export default useEditQuote;