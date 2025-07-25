import useForm from '../../hooks/useForm';
import useRegister from '../../hooks/useRegister';
import './Register.scss'

const initialValues = {
    email: '',
    password: '',
    rePassword: ''
}

const Register = () => {

    const { values, handleChange } = useForm(initialValues);
    const { register } = useRegister();

    const handleSubmit = (e) => {
        e.preventDefault();
        register(values);
    }

    return (
        <section className='register-form__container'>
            <h1>Welcome to Register page</h1>
            <form
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <label>
                        Email
                    </label>
                    <input
                        value={values.email}
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name='email'
                        autoComplete='off'
                    />
                </div>

                <div>
                    <label>
                        Password
                    </label>
                    <input
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name='password'
                        autoComplete='off'
                    />
                </div>

                <div>
                    <label>
                        Repeat password
                    </label>
                    <input
                        value={values.rePassword}
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name='rePassword'
                        autoComplete='off'
                    />
                </div>
                <button>Submit</button>
            </form>

        </section>
    )
}

export default Register;