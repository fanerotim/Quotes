export const historyReducer = (state, action) => {

    switch (action.type) {
        case 'UPDATE-HISTORY': {

            // we do not want to have two identical routes one after another
            if (state.location[0] !== action.payload) {
                state.location.unshift(action.payload);
            }
            console.log(state);
            return state
        }
        default:
            return state
    }
}