import http from '../requester/http';

const useRequestSearch = () => {

    const requestSearch = async (searchText) => {
        try {
            const searchedQuotes = await http.post(`${import.meta.env.VITE_BASE_URL}/search-quotes`, searchText);
            return searchedQuotes;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    }

    return {
        requestSearch
    }
}

export default useRequestSearch;