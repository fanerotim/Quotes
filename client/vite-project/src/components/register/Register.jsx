import './Register.scss'

const Register = () => {
    return (
        <section className='register-form__container'>
            <h1>Welcome to Register page</h1>
            <form>
                <div>
                    <label>
                        Email
                    </label>
                    <input type="email"/>
                </div>

                <div>
                    <label>
                        Password
                    </label>
                    <input type="password" />
                </div>

                <div>
                    <label>
                        Repeat password
                    </label>
                    <input type="password" />
                </div>
            </form>

        </section>
    )
}

export default Register;