export const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN': {
            localStorage.setItem('accessToken', JSON.stringify(action.payload));
            return { auth: action.payload };
        }
        case 'LOGOUT': {
            localStorage.removeItem('accessToken');
            return { auth: null };
        }
        default:
            return state;
    }
}

