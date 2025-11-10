import styles from './SuccessModal.module.scss';
import { GoCheckCircleFill } from "react-icons/go";
import useSuccessModal from '../../hooks/useSuccessModal';

const SuccessModal = () => {

    const { seconds, startTimer, endTimer } = useSuccessModal();

    if (seconds === 5) {
        startTimer();
    }

    if (seconds === 0) {
        endTimer();
    }

    return (
        <article
            className={styles.success__modal__container}
        >
            <div
                className={styles.success__modal__text__wrapper}
            >
                <div
                    className={styles.success__modal__icon__container}
                >
                    <GoCheckCircleFill
                        className={styles.success__modal__icon}
                    />
                </div>

                <h1
                    className={styles.success__modal__heading}
                >
                    Awesome!
                </h1>
                <p
                    className={styles.success__modal__subheading}
                >
                    Your request was successful. Redirecting...
                </p>
            </div>
        </article>
    )
}

export default SuccessModal;