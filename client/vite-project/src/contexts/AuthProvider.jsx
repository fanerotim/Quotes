import { useReducer } from "react";
import { AuthContext, authReducer } from "./authContext"
import useGetAccessToken from "../hooks/useGetAccessToken";

const AuthProvider = ({ children }) => {

    const getToken = useGetAccessToken();
    let accessToken = getToken();

    const [auth, dispatch] = useReducer(authReducer, accessToken);

    return (
        <AuthContext.Provider
            value={{ auth, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;