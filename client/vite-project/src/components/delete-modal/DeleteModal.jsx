import './DeleteModal.scss'

const DeleteModal = ({ isOpen, onDelete, toggleIsOpen }) => {

    return (
        isOpen && (
            <section className='delete-modal-container'>
                <div className='delete-modal-wrapper'>
                    <h1>Are you sure you want to delete this quote?</h1>
                    <button
                        onClick={onDelete}>
                        Yes
                    </button>
                    <button
                        onClick={toggleIsOpen}>
                        No
                    </button>
                </div>
            </section>
        )
    )
}

export default DeleteModal;