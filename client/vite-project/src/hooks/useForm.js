import { useState, useEffect } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues])

    const handleChange = (e) => {

        // TODO: Improve the logic of this flow. having so many conditional checks is bad
        if (e.target.nodeName === 'SPAN') {
            return
        }
        // this conditional check solves the problem of updating the values state when custom select
        // TODO: optimize the solution
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