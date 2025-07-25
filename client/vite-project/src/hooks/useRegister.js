import http from "../requester/http"

const useRegister = () => {

    const register = async ({ email, password, rePassword }) => {

        // TODO: ADD ERROR HANDLING
        if (email === '' || password === '' || rePassword === '') {
            console.log('CANNOT REGISTER WITH EMPTY FILEDS')
        }

        if (password !== rePassword) {
            console.log('Password mismatch')
        }

        try {
            const newUser = await http.post('http://localhost:3000/user/register', {email, password, rePassword})
        } catch(err) {
            console.log(err);
        }
    }

    return {
        register
    }
}

export default useRegister