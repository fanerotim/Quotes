const useHasMoreQuotes = () => {

    const hasMoreQuotesInDb = () => {
        const hasMore = JSON.parse(localStorage.getItem('hasMore')) ? true : false;
        return hasMore;
    }

    const setInitialStatusOfHasMoreQuotesInDb = (hasMore) => {
        localStorage.setItem('hasMore', JSON.stringify({hasMore}))
    }

    return {
        hasMoreQuotesInDb,
        setInitialStatusOfHasMoreQuotesInDb
    }
}

export default useHasMoreQuotes;