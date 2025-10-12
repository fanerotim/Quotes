import styles from './ResetPassword.module.scss';
import useResetPassword from '../../hooks/useResetPassword';
import useForm from '../../hooks/useForm';

const initialValues = {
    email: ''
}

const ResetPassword = () => {

    const { values, handleChange } = useForm(initialValues);

    const {
        error,
        isLoading,
        isSubmitted,
        handleSubmit
    } = useResetPassword();

    return (
        <section
            className={styles.reset__password__container}
        >

            <div
                className={styles.reset__password__text__container}
            >
                <h1
                    className={styles.reset__password__text__heading}
                >
                    Reset
                </h1>
                <h2
                    className={styles.reset__password__text__subheading}
                >
                    Fill in the form and we'll email you a new one
                </h2>
            </div>

            {!isSubmitted &&

                <form
                    onSubmit={(e) => handleSubmit(e, values)}
                    className={styles.reset__password__form}
                >

                    <div
                        className={styles.form__data}
                    >
                        <label
                            className={styles.reset__password__form__label}
                        >
                            Email address
                        </label>
                        <input
                            onChange={handleChange}
                            className={styles.reset__password__form__input}
                            value={values.email}
                            placeholder='Enter your email'
                            name='email'
                            type="email"
                            required
                        />
                    </div>

                    <button
                        className={styles.reset__password__form__submit__button}
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                </form>}

            {error && <p>{error}</p>}
            {isSubmitted && <h2>Password updated successfully. Please check your email and log in again.</h2>}
        </section>
    )
}

export default ResetPassword;