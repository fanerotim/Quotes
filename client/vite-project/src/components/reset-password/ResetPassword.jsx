import './ResetPassword.scss';
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
        <section>
            <h1>Reset your password</h1>
            {!isSubmitted && <form
                onSubmit={(e) => handleSubmit(e, values)}>
                <label>Enter your email</label>
                <input
                    value={values.email}
                    name='email'
                    onChange={handleChange}
                    type="email"
                />
                <br />
                <button disabled={isLoading}>Submit</button>
            </form>}
            {error && <p>{error}</p>}
            {isSubmitted && <h2>Password updated successfully. Please check your email and log in again.</h2>}
        </section>
    )
}

export default ResetPassword;