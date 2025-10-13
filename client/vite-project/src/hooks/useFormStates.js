import { useReducer } from "react"

const reducer = (state, action) => {

    switch (action.type) {
        case 'LOADING': {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }
        case 'ERROR': {
            return {
                ...state,
                error: action.payload
            }
        }
        case 'SUCCESS': {
            return {
                ...state,
                success: !state.success
            }
        }
    }
}

const useFormStates = () => {
    const [state, dispatch] = useReducer(reducer, {
        isLoading: false,
        error: { message: null },
        success: false
    })

    const updateState = (actionType, err) => {

        dispatch({
            type: actionType,
            payload: err
        })
    }

    return {
        error: state.error.message,
        isLoadnig: state.isLoading,
        success: state.success,
        updateState
    }
}

export default useFormStates;