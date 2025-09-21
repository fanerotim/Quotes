import { useReducer, createContext, useEffect } from "react";
import { authReducer } from "./authReducer"

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, { auth: null, sessionExpired: false });

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
  
        if (token) {
            dispatch({
                type: 'LOGIN',
                payload: token
            })
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;