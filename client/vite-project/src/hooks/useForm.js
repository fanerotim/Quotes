import { useState, useEffect } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues])

    const handleChange = (e) => {

        // SPAN is the dropdown icon (up/down icon) of the custom select. it does not have textContent, so we just return if we click on it
        // keeping this for now as it works and will optimize in the future
        if (e.target.nodeName === 'SPAN') {
            return
        }

        // custom select is built with a div and a paragraph. they do not have value prop, so to update values we use their textContent
        // that's why we have this conditional logic here. keeping it for now as it works and will be optimized in the future
        if (e.target.nodeName === 'DIV' || e.target.nodeName === 'P') {
            
           setValues((oldValues) => {
                return {
                    ...oldValues,
                    'category': e.target.textContent
                }
            })
            return;
        }
 
        setValues((oldValues) => {
            // TODO; add support for checkbox - this does not work for checkboxes;
            return {
                ...oldValues,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleClear = () => {
        setValues(initialValues);
    }

    return {
        values,
        handleChange,
        handleClear
    }
}

export default useForm;