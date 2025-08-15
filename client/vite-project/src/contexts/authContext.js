import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const authReducer = (auth, action) => {

    switch (action.type) {
        case 'LOGIN': {
            const accessToken = localStorage.setItem('accessToken', JSON.stringify(action.accessToken));
            return accessToken;    
        }
        case 'LOGOUT': {
            localStorage.removeItem('accessToken');
            return null;
        }
        default:
            return auth;
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
}