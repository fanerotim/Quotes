import styles from './UpdatePassword.module.scss';
import globalStyles from '../../../App.module.scss'
import useForm from '../../../hooks/useForm';
import useUpdatePassword from '../../../hooks/useUpdatePassword';
import SuccessModal from '../../success-modal/SuccessModal';
import Loader from '../../loader/Loader';

const initialValues = {
    password: ''
}

const UpdatePassword = () => {

    const { values, handleChange } = useForm(initialValues);
    const {
        isLoading,
        success,
        toggleIsOpen,
        handleSubmit
    } = useUpdatePassword();

    return (
        <div
            className={styles.update__password__page__container}
        >

            <div
                className={styles.update__password__text__container}
            >
                <h1
                    className={styles.update__password__text__container__main__text}
                >
                    Update
                </h1>

                <p
                    className={styles.update__password__text__container__secondary__text}
                >
                    Fill in the below form to update your password
                </p>
            </div>

            {isLoading
                ?
                <Loader />
                :
                success
                    ?
                    <SuccessModal />
                    :
                    <form
                        onSubmit={(e) => handleSubmit(e, values)}
                        className={`${styles.update__password__form}`}
                    >
                        <label
                            className={styles.update__password__form__label}
                        >
                            New password
                        </label>
                        <input
                            value={values.password}
                            onChange={handleChange}
                            className={styles.update__password__form__input}
                            placeholder='Enter your new password'
                            name="password"
                            type="text"
                            required
                            minLength={3}
                        />

                        <button
                            className={globalStyles.submit__button}
                        >
                            Submit
                        </button>
                    </form>
            }
        </div>
    )
}

export default UpdatePassword;