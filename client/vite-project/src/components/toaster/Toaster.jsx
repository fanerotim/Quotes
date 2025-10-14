import styles from './Toaster.module.scss';

const Toaster = ({ message }) => {

    return (
        <article
            className={
                `${message ? styles.show : styles.toaster__container}`
            }
        >
            <p
                className={styles.error__message}
            >
                {message}
            </p>
        </article>
    )
}


export default Toaster;