import { useState } from "react";
import { useParams } from 'react-router-dom';
import useDelete from '../hooks/useDelete'

const useDeleteModal = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { deleteOne } = useDelete();
    const { quoteId } = useParams();

    const toggleIsOpen = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    const onDelete = async () => {
        // TODO: it is not very wise to hardcode the url 'delete-quote' in this case. refactor later
        const deletedQuote = await deleteOne('delete-quote', { id: quoteId });
    }

    return {
        isOpen,
        toggleIsOpen,
        onDelete
    }
}

export default useDeleteModal;