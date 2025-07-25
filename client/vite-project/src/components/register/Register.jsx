import useForm from '../../hooks/useForm';
import './Register.scss'

const initialValues = {
    email: '',
    password: '',
    rePassword: ''
}

const Register = () => {

    const { values, handleChange } = useForm(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
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
                    />
                </div>
                <button>Submit</button>
            </form>

        </section>
    )
}

export default Register;