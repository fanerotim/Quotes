const useAddQuote = () => {
    
    const addQuote = (values) => {
        
        try {
            console.log('values from addQuote', values)
        } catch(err) {
            console.log(err);
            return err;
        }
    }

    return {
        addQuote
    }
}

export default useAddQuote;