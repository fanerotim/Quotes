import useGetUserQuotesRequest from './useGetUserQuotesRequest';
import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useGetUserQuotes = () => {
    const { getUserQuotes } = useGetUserQuotesRequest();
    const [userQuotes, setUserQuotes] = useState([]);
    const { auth } = useAuthContext();

    useEffect(() => {
        getUserQuotes()
            .then(quotes => setUserQuotes(quotes))
            .catch(err => console.error(err));
    }, [])

    return {
        email: auth?.email,
        userQuotes
    }
}

export default useGetUserQuotes;