import { useNavigate } from 'react-router-dom';
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
    const { register, error, loading } = useRegister();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
         
        try {
            const newUser = await register(values);
            navigate('/users/login');
        } catch (err) { 
            console.error(err);
        }
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
                {error && <p className='errorMessage'>{error}</p>}
                <button disabled={loading}>Submit</button>
            </form>

        </section>
    )
}

export default Register;