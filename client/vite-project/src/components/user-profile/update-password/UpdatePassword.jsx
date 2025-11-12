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
        isOpen,
        isLoading,
        success,
        toggleIsOpen,
        handleSubmit
    } = useUpdatePassword();

    return (
        <>
            <button
                onClick={toggleIsOpen}
                // className={styles.reset__password__form__button__toggler}
                className={globalStyles.submit__button}
            >
                {isOpen ? 'Close' : 'Click here to update your password'}
            </button>

            {isOpen ?
                isLoading
                    ?
                    <Loader />
                    :
                    success
                        ?
                        <SuccessModal />
                        :
                        <form
                            onSubmit={(e) => handleSubmit(e, values)}
                            className={`${styles.update__password__form} ${isOpen ? styles.open : styles.closed}`}
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
                : ''
            }
        </>
    )
}

export default UpdatePassword;