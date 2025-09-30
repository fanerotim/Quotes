const useSearch = () => {

    const handleSubmit = (e, values) => {
        e.preventDefault();
        console.log(values);
    }

    return {
        handleSubmit
    }
}

export default useSearch;