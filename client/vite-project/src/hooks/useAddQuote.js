import validateInputs from "../utils/validateInputs";
import useLogoutOn401Error from "./useLogoutOn401Error";
import useHasMoreQuotes from "./useHasMoreQuotes";
import useAddQuoteRequest from './useAddQuoteRequest';
import { useNavigate } from 'react-router-dom';
import useFormStates from './useFormStates';

const useAddQuote = () => {

    const { logoutOn401 } = useLogoutOn401Error();
    const { setHasMoreStatus } = useHasMoreQuotes();
    const { addQuote } = useAddQuoteRequest();
    const { isLoading, error, updateState } = useFormStates();
    const navigate = useNavigate();

    const handleSubmit = async (e, values) => {
        e.preventDefault();
        // reset error state > set it to null
        updateState('SET_ERROR');

        try {
            // set isLoading to true
            updateState('SET_LOADING');
            validateInputs(values);
            await addQuote(values);
            // set success to true. reset isLoading state e.g. set to false
            updateState('SET_SUCCESS');
            // update local storage status of hasMore to true to make sure load more button is enabled again
            setHasMoreStatus(true);
            // redirect to quotes page after success
            navigate('/quotes');
        } catch (err) {
            // if err > update error state with err.message
            updateState('SET_ERROR', err);
            // check if error is 401 to logout the user
            logoutOn401(err);
            throw err;
        }
    }

    return {
        handleSubmit,
        isLoading,
        error
    }
}

export default useAddQuote;