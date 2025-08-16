import { useReducer } from "react";
import { AuthContext, authReducer, useAuth } from "./authContext"

const AuthProvider = ({ children }) => {

    // changing the auth value renders navigation properly, so this is how we pass token down the tree
    // const { auth } = useAuth();
    const [auth, dispatch] = useReducer(authReducer, {auth: null});

    return (
        <AuthContext.Provider
            value={{ auth, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;