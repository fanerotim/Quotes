import { useState } from "react";
import http from "../requester/http";
import validateInputs from "../utils/validateInputs";
import useLogoutOn401Error from "./useLogoutOn401Error";
import useGetAccessToken from "./useGetAccessToken";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { logoutOn401 } = useLogoutOn401Error();
    // TODO: getToken function retrieves not only the token, but also user email and id
    // Fix this: improve naming, maybe getUserAuthData, or something like that
    const getToken = useGetAccessToken();

    const addQuote = async (values) => {
        setError(null);

        try {
            validateInputs(values);
            // TODO: check above comment: getToken() should be renamed
            // TODO: using optional chaining to check if there is id, but we need to fix this - without an id, the app does not break, but it displays a weird error to the user;
            const userId = getToken()?.id;
            setLoading(true);
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, {...values, ownerId: userId});
            return newQuote;
        } catch (err) {
            // check if error is 401 to logout the user
            logoutOn401(err);
            // standardaze error handling // with this set up err.message the validator errors do not show, if i set it to err, then the front-end breaks as error comes as obj
            setError(err.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        addQuote,
        error,
        isLoading
    }
}

export default useAddQuote;