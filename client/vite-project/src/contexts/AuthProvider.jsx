import { useReducer } from "react";
import { AuthContext, authReducer } from "./authContext"

const AuthProvider = ({ children }) => {

    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    
    if (!accessToken) {
        accessToken = {auth: null}
    }

    const [auth, dispatch] = useReducer(authReducer, accessToken);
  
    return (
        <AuthContext.Provider
            value={{ auth, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;