import './UserProfile.scss'
import useGetUserQuotes from '../../hooks/useGetUserQuotes';
import { useEffect, useState } from 'react';

const UserProfile = () => {

    const { getUserQuotes } = useGetUserQuotes();
    const [userQuotes, setUserQuotes] = useState([]);
    
    useEffect(() => {
        getUserQuotes()
            .then(quotes => setUserQuotes(quotes))
            .catch(err => console.error(quotes));
    }, [])

    return (
        <>
            <h1>Please find the quotes you have added below:</h1>
            {userQuotes.map((quote) => (
                <div>
                    <p>{quote.author}</p>
                    <h3>{quote.text}</h3>
                    <h5>{quote.category}</h5>
                </div>
            ))}
        </>
    )
}

export default UserProfile;