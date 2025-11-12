import styles from './Login.module.scss'
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';
import { Link } from 'react-router-dom';
import Toaster from '../toaster/Toaster';
import Loader from '../loader/Loader';
import SuccessModal from '../success-modal/SuccessModal';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    const { values, handleChange } = useForm(initialValues);
    const { submitHandler, isLoading, error, success } = useLogin();

    return (
        <section
            className={styles.login__form__container}
        >

            <div
                className={styles.login__form__text__container}
            >
                <h1
                    className={styles.login__form__main__heading}
                >
                    Log in
                </h1>
            </div>

            {isLoading
                ?
                <div
                    className={styles.login__form__loader__container}
                >
                    <Loader />
                </div>

                : success ?

                    <div
                        className={styles.login__form__success__modal__container}
                    >
                        <SuccessModal />
                    </div>

                    :

                    <form
                        onSubmit={(e) => submitHandler(e, values)}
                        className={styles.login__form}
                    >
                        <div
                            className={styles.form__data}
                        >
                            <label
                                className={styles.login__form__label}
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => handleChange(e)}
                                className={styles.login__form__input}
                                value={values.email}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                required />
                        </div>

                        <div
                            className={styles.form__data}
                        >
                            <label
                                className={styles.login__form__label}
                            >
                                Password
                            </label>
                            <input
                                onChange={(e) => handleChange(e)}
                                className={styles.login__form__input}
                                value={values.password}
                                type="password"
                                name="password"
                                autoComplete='off'
                                placeholder='Minimum 3 characters'
                                required
                                minLength={3} />
                        </div>

                        <div className={styles.reset__password__container}>
                            <Link
                                to='/users/reset-password'
                                className={styles.reset__password__link}
                            >
                                Forgotten password?
                            </Link>
                        </div>

                        <div className={styles.login__form__submit__button__container}>
                            <button
                                className={styles.login__form__submit__button}
                            >
                                Submit
                            </button>

                        </div>
                    </form>
            }

            <div
                className={styles.login__form__toaster__container}
            >
                <Toaster message={error?.message} />
            </div>
        </section>
    )
}

export default Login;