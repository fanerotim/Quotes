// util that does basic validation; accepts string[], loops through it and if empty value is found throw an error
exports.validateInputs = (inputsArr) => {

    inputsArr.forEach(input => {
        if (!input || !input.trim()) {
            const error = new Error('All fields must be filled.');
            error.statusCode = 400;
            throw error;
        }
        // By mistake have kept the return value inside the forEach call and this function was returning undefined
        // Moving return outside of this scope - will remove comments and commented return later as I want to test further
        // return true;
    });
    return true;
}