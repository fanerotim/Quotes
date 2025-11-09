import styles from './DeleteModal.module.scss';
import Loader from '../loader/Loader';
import SuccessModal from '../success-modal/SuccessModal';

const DeleteModal = ({ isOpen, onDelete, toggleIsOpen, isLoading, success }) => {

    if (isOpen) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'scroll';
    }

    if (success) {
        return (
            <section
                className={styles.delete__modal__container}
            >
                <div
                    className={styles.delete__modal__success_modal__wrapper}
                >
                    <SuccessModal />
                </div>
            </section>
        )
    }

    return (
        isOpen &&
        <section
            className={styles.delete__modal__container}
        >

            <section
                className={styles.delete__modal__content__wrapper}
            >
                {isLoading
                    ?
                    <Loader />
                    :
                    <>
                        <h1
                            className={styles.delete__modal__heading}
                        >
                            Are you sure you want to delete this quote?

                        </h1>

                        <div
                            className={styles.delete__modal__buttons__wrapper}
                        >
                            <button
                                onClick={onDelete}
                                className={styles.delete__modal__approve__btn}
                            >
                                Yes
                            </button>
                            <button
                                onClick={toggleIsOpen}
                                className={styles.delete__modal__reject__btn}
                            >
                                No
                            </button>

                        </div>
                    </>
                }
            </section>
        </section>
    )
}

export default DeleteModal;