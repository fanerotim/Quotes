import validateInputs from "../utils/validateInputs";
import useLogoutOn401Error from "./useLogoutOn401Error";
import useHasMoreQuotes from "./useHasMoreQuotes";
import useAddQuoteRequest from './useAddQuoteRequest';
import { useNavigate } from 'react-router-dom';

const useAddQuote = () => {

    const { logoutOn401 } = useLogoutOn401Error();
    const { setHasMoreStatus } = useHasMoreQuotes();
    const { addQuote } = useAddQuoteRequest();
    const navigate = useNavigate();

    const handleSubmit = async (e, values) => {
        e.preventDefault();

        try {
            validateInputs(values);
            await addQuote(values);
            // update local storage status of hasMore to true to make sure load more button is enabled again
            setHasMoreStatus(true);
            // redirect to quotes page after success
            navigate('/quotes');
        } catch (err) {
            // check if error is 401 to logout the user
            logoutOn401(err);
            throw err;
        } finally {
            // not yet handling loading / error
            // setLoading(false);
        }
    }

    return {
        handleSubmit
    }
}

export default useAddQuote;