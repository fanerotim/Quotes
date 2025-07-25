const useRegister = () => {

    const register = async ({ email, password, rePassword }) => {

        if (email === '' || password === '' || rePassword === '') {
            console.log('CANNOT REGISTER WITH EMPTY FILEDS')
        }

        if (password !== rePassword) {
            console.log('Password mismatch')
        }
    }

    return {
        register
    }
}

export default useRegister