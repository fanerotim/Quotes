import { useReducer } from "react"

const reducer = (state, action) => {

    switch (action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }
        case 'SET_ERROR': {
            return {
                ...state,
                success: false,
                error: action.payload
            }
        }
        case 'SET_SUCCESS': {
            return {
                ...state,
                success: true
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
        ...state,
        updateState
    }
}

export default useFormStates;