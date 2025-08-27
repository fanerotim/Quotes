const validateInputs = (inputAsObj) => {

    // filter the input object to make sure it does not contain id
    // id is of type number, so if kept then .trim() method returns error, as it's a string method
    const inputAsArr = Object.entries(inputAsObj)
        .filter(([key, value]) => key !== 'id')
        .map(([key, value]) => value);

    inputAsArr.map((value) => {
        if (!value || !value.trim()) {
            // TODO: for now I am not throwing new Error to align with the format of errors returned from the REST API
            throw new Error('All fields must be filled');
        }
    })
    
    return inputAsObj;
}

export default validateInputs;