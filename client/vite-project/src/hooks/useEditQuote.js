const useEditQuote = () => {
    
    const edit = (values, quoteId) => {
        console.log('values', values);
        console.log('quoteId', quoteId);
    }

    return {
        edit
    }
}

export default useEditQuote;