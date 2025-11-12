import styles from './Register.module.scss';
import globalStyles from '../../App.module.scss';
import useForm from '../../hooks/useForm';
import useRegister from '../../hooks/useRegister';
import Toaster from '../toaster/Toaster';
import Loader from '../loader/Loader';
import SuccessModal from '../success-modal/SuccessModal';

const initialValues = {
    email: '',
    password: '',
    rePassword: ''
}

const Register = () => {

    const { values, handleChange } = useForm(initialValues);
    const { submitHandler, error, isLoading, success } = useRegister();


    return (
        <section
            className={styles.register__form__container}
        >

            <div 
                className={styles.register__form__text__container}
            >
                <h1
                    className={styles.register__form__main__heading}
                >
                    Register
                </h1>
            </div>

            {isLoading ?

            <div
                className={styles.register__form__loader__container}
            >
                <Loader/>
            </div>  
            
            : success ?

            <div
                className={styles.register__form__success__modal__container}
            >
                <SuccessModal/>
            </div>
            
            : <form
                onSubmit={(e) => submitHandler(e, values)}
                className={styles.register__form}
            >

                <div
                    className={styles.form__data}
                >
                    <label
                        className={styles.register__form__label}
                    >
                        Email
                    </label>

                    <input
                        onChange={(e) => handleChange(e)}
                        className={styles.register__form__input}
                        value={values.email}
                        type="email"
                        name='email'
                        autoComplete='off'
                        placeholder='Enter email'
                        required
                    />
                </div>

                <div
                    className={styles.form__data}
                >
                    <label
                        className={styles.register__form__label}
                    >
                        Password
                    </label>

                    <input
                        onChange={(e) => handleChange(e)}
                        className={styles.register__form__input}
                        value={values.password}
                        type="password"
                        name='password'
                        autoComplete='off'
                        placeholder='Enter password'
                        required
                    />
                </div>

                <div
                    className={styles.form__data}
                >
                    <label
                        className={styles.register__form__label}
                    >
                        Repeat password
                    </label>
                    <input
                        onChange={(e) => handleChange(e)}
                        className={styles.register__form__input}
                        value={values.rePassword}
                        type="password"
                        name='rePassword'
                        autoComplete='off'
                        placeholder='Confirm your password'
                        required
                    />
                </div>
                <button
                    className={globalStyles.submit__button}
                >
                    Register
                </button>
            </form>}

            <div
                className={styles.register__form__toaster__wrapper}
            >
                <Toaster message={error?.message}/>
            </div>
        </section>
    )
}

export default Register;