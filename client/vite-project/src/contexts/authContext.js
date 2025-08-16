import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const authReducer = (auth, action) => {

    switch (action.type) {
        case 'LOGIN': {
            localStorage.setItem('accessToken', JSON.stringify(action.accessToken));
            return action.accessToken;    
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