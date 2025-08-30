// util that does basic validation; accepts string[], loops through it and if empty value is found throw an error
exports.validateInputs = (inputsArr) => {
    console.log(typeof inputsArr[0]);
    inputsArr.forEach(input => {
        if (!input || !input.trim()) {      
            const error = new Error('All fileds must be filled.');
            error.statusCode = 400;
            throw error;
        }
        return true;
    });
}