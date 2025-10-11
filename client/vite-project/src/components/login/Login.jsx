import './Login.scss'
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';

import { Link } from 'react-router-dom';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    const { values, handleChange } = useForm(initialValues);
    const { submitHandler } = useLogin();

    return (
        <section>
            <h1>Please log in</h1>
            <form onSubmit={(e) => submitHandler(e, values)}>
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
                <Link to='/users/reset-password'>Reset password</Link>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default Login;