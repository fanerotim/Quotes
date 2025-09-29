const useHasMoreQuotes = () => {

    const setHasMoreStatus = (status) => {
        localStorage.setItem('hasMore', JSON.stringify(status));
    }

    const getHasMoreStatus = () => {
        const hasMore = JSON.parse(localStorage.getItem('hasMore')) ? true : false;
        return hasMore ? true : false;
    }

    return {
        setHasMoreStatus,
        getHasMoreStatus,
    }
}

export default useHasMoreQuotes;