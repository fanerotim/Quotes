import { useState, useEffect } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues])

    const handleChange = (e) => {
        setValues((oldValues) => {
            // TODO; add support for checkbox - this does not work for checkboxes;
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