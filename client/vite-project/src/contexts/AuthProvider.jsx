import { AuthContext } from "./authContext"

const AuthProvider = ({ children }) => {

    return (
        <AuthContext.Provider value={'asda'}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;