import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEditQuoteRequest from './useEditQuoteRequest';
import useGetQuote from './useGetQuote';
import useLogoutOn401Error from './useLogoutOn401Error';
import useLocalStorageQuotes from './useLocalStorageQuotes';
import validateInputs from '../utils/validateInputs';
import useFormStates from './useFormStates';

const useEditQuote = () => {
    const [quote, setQuote] = useState(null);

    const navigate = useNavigate();
    const { quoteId } = useParams();

    const { getQuote } = useGetQuote();
    const { edit } = useEditQuoteRequest();
    const { logoutOn401 } = useLogoutOn401Error();
    const { updateLocalStorageQuotesAfterEdit } = useLocalStorageQuotes();
    const { isLoading, error, success, updateState } = useFormStates();


    useEffect(() => {
        // set isLoading to true whilst data is being fetched
        updateState('SET_LOADING');
        // get data of quote we want to edit
        getQuote(quoteId)
            .then(data => {
                // set success to true / isLoading is being updated to false
                updateState('SET_SUCCESS');
                setQuote(data)
            })
            .catch(err => console.error(err))
    }, []);

    const handleSubmit = async (e, values) => {
        e.preventDefault();
        // reset error state as we'll be making a new api call
        updateState('SET_ERROR');

        try {
            // set isLoading to true again as a new api call is being made
            updateState('SET_LOADING');
            validateInputs(values);
            await edit(values, quoteId);
            // set success to true / isLoading to false as quote is edited / updated successfully
            updateState('SET_SUCCESS');
            updateLocalStorageQuotesAfterEdit({ id: quoteId, ...values });
            navigate(`/quotes/${quoteId}`)
        } catch (err) {
            // set error to true and pass err
            updateState('SET_ERROR', err);
            // if err, check for 401 and logout user if so
            logoutOn401(err);
            throw err;
        }
    }

    return {
        handleSubmit,
        quote,
        error,
        isLoading
    }
}

export default useEditQuote;