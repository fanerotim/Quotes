import './UpdatePassword.scss';
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
        handleSubmit,
        isSubmitted } = useUpdatePassword();

    return (
        <>
            <button onClick={toggleIsOpen}>{isOpen ? 'Close form' : 'Click here to update your password'}</button>

            {isOpen && <form
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
                {/* temporary <br/> - have not started styling yet */}
                <br />
                <button>Submit</button>
            </form>}
            {isSubmitted && <h1>Successfully updated your password</h1>}
        </>
    )
}

export default UpdatePassword;