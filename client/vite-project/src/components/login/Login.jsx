import './Login.scss'
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    const { values, handleChange } = useForm(initialValues);
    const { login, error, loading  } = useLogin();
    const navigate = useNavigate();

    const clickHandler = async (e) => {
        e.preventDefault();

        try {
            const token = await login({ email: values.email, password: values.password });
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section>
            <h1>Please log in</h1>
            <form onSubmit={(e) => clickHandler(e)}>
                <div>
                    <label>Email</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        value={values.email}
                        type="text"
                        name="email"
                        placeholder="Enter email" />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        value={values.password}
                        type="password"
                        name="password"
                        autoComplete='off'
                        placeholder='Password' />
                </div>
                {error && <p className='errorMessage'>{error}</p>}
                <button disabled={loading}>Submit</button>
            </form>
        </section>
    )
}

export default Login;