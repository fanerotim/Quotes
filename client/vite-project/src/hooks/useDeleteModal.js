import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useDeleteRequest from './useDeleteRequest';
import useFormStates from "./useFormStates";
import useLogoutOn401Error from "./useLogoutOn401Error";
import useLocalStorageQuotes from "./useLocalStorageQuotes";
import useSuccessModal from "./useSuccessModal";

const useDeleteModal = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { deleteOne } = useDeleteRequest();
    const { logoutOn401 } = useLogoutOn401Error();
    const { filterLocalStorageQuotesAfterDelete } = useLocalStorageQuotes();
    const { isLoading, success, updateState } = useFormStates();
    const { delayMs } = useSuccessModal();
    const { quoteId } = useParams();
    const navigate = useNavigate();

    const toggleIsOpen = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    const onDelete = async () => {
        // TODO: it is not very wise to hardcode the url 'delete-quote' in this case. refactor later

        try {
            updateState('SET_LOADING')
            const deletedQuote = await deleteOne('delete-quote', { id: quoteId });
            // remove deleted item from localStorage as /quotes page loads data from localStorage (used as cache to avoid unnecessary api calls)
            filterLocalStorageQuotesAfterDelete(quoteId);
            updateState('SET_SUCCESS');

            setTimeout(() => {
                navigate('/quotes')
            }, delayMs)
        } catch (err) {
            logoutOn401(err)
            // TODO: handle error state too
        }
    }

    return {
        isOpen,
        toggleIsOpen,
        onDelete,
        isLoading,
        success
    }
}

export default useDeleteModal;