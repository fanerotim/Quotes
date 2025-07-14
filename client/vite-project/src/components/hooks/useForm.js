import { useState, useEffect } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues])

    const handleChange = (e) => {
        console.log('change handler', e.target.value)
        setValues((oldValues) => {
            return {
                ...oldValues,
                [e.target.name]: e.target.value
            }
        })
    }

    return {
        values,
        handleChange
    }
}

export default useForm;