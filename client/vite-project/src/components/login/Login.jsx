import './Login.scss'
import useForm from '../../hooks/useForm';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    const {values, handleChange} = useForm(initialValues);

    const clickHandler = (e) => {
        e.preventDefault();
        console.log(values);
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
                        name="email"/>
                </div>

                <div>
                    <label>Password</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        value={values.password} 
                        type="password"
                        name="password" 
                        autoComplete='off'/>
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default Login;