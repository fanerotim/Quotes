const useGetAccessToken = () => {
    
    const getToken = () => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        return accessToken;
    }

    return getToken;
}

export default useGetAccessToken;