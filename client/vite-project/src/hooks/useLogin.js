const useLogin = () => {

    const login = ({ email, password }) => {
        console.log(`this is user email: ${email} and this is their password ${password}`)
        
        const randomNumber = Math.floor(Math.random() * 100);

        return randomNumber > 50 ? 'successfull' : 'unsucessful';
    }

    return {
        login
    }
}

export default useLogin;