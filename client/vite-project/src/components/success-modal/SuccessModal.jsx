import styles from './SuccessModal.module.scss';
import { GoCheckCircleFill } from "react-icons/go";

const SuccessModal = () => {

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
                    Your request was successful. We'll redirect you in 3 seconds.
                </p>
            </div>
        </article>
    )
}

export default SuccessModal;