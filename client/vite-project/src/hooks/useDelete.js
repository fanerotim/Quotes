import { useNavigate } from "react-router-dom";
import http from "../requester/http";
import useLogoutOn401Error from "./useLogoutOn401Error";
import useLocalStorageQuotes from "./useLocalStorageQuotes";

const useDelete = () => {

    const navigate = useNavigate();
    const { logoutOn401 } = useLogoutOn401Error();
    const { filterLocalStorageQuotesAfterDelete } = useLocalStorageQuotes();

    const deleteOne = async (url, values) => {
        // get id, so we can filter out the deleted quote from localStorage, which is used as my cache level
        const { id } = values;

        try {
            await http.deleteOne(`${import.meta.env.VITE_BASE_URL}/${url}`, values);
            // remove deleted item from localStorage as /quotes page loads data from localStorage (used as cache to avoid unnecessary api calls)
            filterLocalStorageQuotesAfterDelete(id);
            navigate('/quotes')
            // There is no returned item, as I simply return success msg;
            // TODO: think if you want to return a success msg instead of redirecting
        } catch (err) {
            logoutOn401(err);
            throw err;
        }
    }

    return {
        deleteOne
    }
}

export default useDelete;