import styles from './ResetPassword.module.scss';
import globalStyles from '../../App.module.scss';
import useResetPassword from '../../hooks/useResetPassword';
import useForm from '../../hooks/useForm';
import Toaster from '../toaster/Toaster';
import SuccessModal from '../success-modal/SuccessModal';
import Loader from '../loader/Loader';

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
                    Fill in the form and we'll email you a new password
                </h2>
            </div>

            {isSubmitted

                ?
                <div
                    className={styles.success__modal__container}
                >
                    <SuccessModal />
                </div>
                :

                isLoading
                    ?

                    <div
                        className={styles.loader__container}
                    >
                        <Loader />
                    </div>
                    :

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
                            className={globalStyles.submit__button}
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </form>}

            <div
                className={styles.error__toaster__container}
            >
                <Toaster message={error} />
            </div>

        </section>
    )
}

export default ResetPassword;