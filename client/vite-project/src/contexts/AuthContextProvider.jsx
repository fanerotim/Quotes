import { useReducer, createContext } from "react";
import { authReducer } from "./authReducer"
import useGetAccessToken from "../hooks/useGetAccessToken";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {

    const getToken = useGetAccessToken();
    let accessToken = getToken();
    
    const [state, dispatch] = useReducer(authReducer, accessToken);

    return (
        <AuthContext.Provider
            value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;