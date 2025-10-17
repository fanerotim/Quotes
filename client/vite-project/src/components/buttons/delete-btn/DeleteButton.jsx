import styles from './DeleteButton.module.scss';
import DeleteModal from "../../delete-modal/DeleteModal";
import useDeleteModal from '../../../hooks/useDeleteModal';

const DeleteButton = () => {

    const {
        isOpen,
        toggleIsOpen,
        onDelete,
        isLoading,
        success
    } = useDeleteModal();

    return (
        <>
            <DeleteModal
                isOpen={isOpen}
                onDelete={onDelete}
                toggleIsOpen={toggleIsOpen} 
                isLoading={isLoading}
                success={success}
            />
            <button
                onClick={() => toggleIsOpen((prevIsOpen) => !prevIsOpen)}
                className={styles.delete__button}>
                Delete
            </button>
        </>
    )
}

export default DeleteButton;