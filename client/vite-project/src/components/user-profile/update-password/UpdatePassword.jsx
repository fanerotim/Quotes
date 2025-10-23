import styles from './UpdatePassword.module.scss';
import useForm from '../../../hooks/useForm';
import useUpdatePassword from '../../../hooks/useUpdatePassword';

const initialValues = {
    password: ''
}

const UpdatePassword = () => {

    const { values, handleChange } = useForm(initialValues);
    const {
        isOpen,
        toggleIsOpen,
        handleSubmit
    } = useUpdatePassword();

    return (
        <>
            <button
                onClick={toggleIsOpen}
                className={styles.reset__password__f}
            >
                {isOpen ? 'Close form' : 'Click here to update your password'}
            </button>

            {isOpen &&

                <form
                    onSubmit={(e) => handleSubmit(e, values)}
                >
                    <label>
                        Enter your new password
                    </label>
                    <input
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        type="text"
                    />
   
                    <button
                    
                    >
                        Submit
                    </button>

                </form>}
        </>
    )
}

export default UpdatePassword;