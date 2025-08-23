const validateInputs = (inputAsObj) => {

    // filter the input object to make sure it does not contain value
    // value is a number, so if kept then .trim() method breaks as it's a string method
    const inputAsArr = Object.entries(inputAsObj)
        .filter(([key, value]) => key !== 'id')
        .map(([key, value]) => value);

    inputAsArr.map((value) => {
        if (!value || !value.trim()) {
            throw new Error('All fields must be filled!');
        }
    })

    return inputAsObj;
}

export default validateInputs;