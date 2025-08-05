import './Login.scss'

const Login = () => {
    return (
        <section>   
            <h1>Please log in</h1>
            <form>
                <div>
                    <label>Email</label>
                    <input type="text" />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" />
                </div>
            </form>
        </section>
    )
}

export default Login;