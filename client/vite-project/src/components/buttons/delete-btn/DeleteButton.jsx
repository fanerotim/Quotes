import DeleteModal from "../../delete-modal/DeleteModal";
import useDeleteModal from '../../../hooks/useDeleteModal'

const DeleteButton = () => {

    const {
        isOpen,
        toggleIsOpen,
        onDelete,
    } = useDeleteModal();

    return (
        <>
            <DeleteModal
                isOpen={isOpen}
                onDelete={onDelete}
                toggleIsOpen={toggleIsOpen} />
            <button
                onClick={() => toggleIsOpen((prevIsOpen) => !prevIsOpen)}>
                Delete
            </button>
        </>
    )
}

export default DeleteButton;