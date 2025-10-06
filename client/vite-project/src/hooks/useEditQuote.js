import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEditQuote from './useRequestEditQuote';
import useGetQuote from './useGetQuote';
import useLogoutOn401Error from './useLogoutOn401Error';
import useLocalStorageQuotes from './useLocalStorageQuotes';
import validateInputs from '../utils/validateInputs';

const useEdit = () => {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { quoteId } = useParams();
    
    const { getQuote } = useGetQuote();
    const { edit } = useEditQuote();
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
        setError(null);

        try {
            validateInputs(values);
            setIsLoading(true);
            await edit(values, quoteId);
            updateLocalStorageQuotesAfterEdit({ id: quoteId, ...values });
            navigate(`/quotes/${quoteId}`)
        } catch (err) {
            // if err, check for 401 and logout user if so
            logoutOn401(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        handleSubmit,
        quote,
        error,
        isLoading
    }
}

export default useEdit;