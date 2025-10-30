import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEditQuoteRequest from './useEditQuoteRequest';
import useGetQuote from './useGetQuote';
import useLogoutOn401Error from './useLogoutOn401Error';
import useLocalStorageQuotes from './useLocalStorageQuotes';
import validateInputs from '../utils/validateInputs';
import useFormStates from './useFormStates';
import useSuccessModal from './useSuccessModal';

const useEditQuote = () => {
    const [quote, setQuote] = useState(null);

    const navigate = useNavigate();
    const { quoteId } = useParams();

    const { getQuote } = useGetQuote();
    const { edit } = useEditQuoteRequest();
    const { logoutOn401 } = useLogoutOn401Error();
    const { updateLocalStorageQuotesAfterEdit } = useLocalStorageQuotes();
    const { isLoading, error, success, updateState } = useFormStates();
    const { delayMs } = useSuccessModal();

    useEffect(() => {
        // set isLoading to true whilst data is being fetched
        updateState('SET_LOADING');
        // get data of quote we want to edit
        getQuote(quoteId)
            .then(data => {
                // TODO: read below comment and fix this
                // found a bug with SET_SUCCESS - it shows success modal as in this component i make two api calls, one to retrieve quote data and another one to update it. SET_SUCCESS shows modal when it should not, because i only loaded the quote data, no edit is made yet. 
                // THERE IS NO ERROR, BUT THERE IS A BUG - THAT'S WHY I AM USING 'SET_ERROR' FOR NOW - ABOVE COMMENT CLARIFIES THE BUG
                updateState('SET_ERROR');
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
            // update local storage as i am using it as a caching option to avoid making unnecesasry api calls
            updateLocalStorageQuotesAfterEdit({ id: quoteId, ...values });

            // setting this timeout as i want to show success modal for 5 seconds before redirecting the user
            // this functionality will be extracted, but keeping it as it is for now until i decide how i want to extract it
            setTimeout(() => {
                navigate(`/quotes/${quoteId}`)
            }, delayMs)
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
        isLoading,
        success
    }
}

export default useEditQuote;