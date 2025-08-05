import './Login.scss'
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    const { values, handleChange } = useForm(initialValues);
    const { login } = useLogin();

    const clickHandler = async (e) => {
        e.preventDefault();

        const token = await login({email: values.email, password: values.password});
        console.log('this is user token: ', token)
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
                        name="email" />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        value={values.password}
                        type="password"
                        name="password"
                        autoComplete='off' />
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default Login;