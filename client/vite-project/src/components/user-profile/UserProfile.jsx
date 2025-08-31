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
        <section className='page__wrapper'>
            <h1>Please find the quotes you have added below:</h1>
            {/* TODO: fix this. It would be better if we can not use conditional chaining */}
            {userQuotes?.map((quote) => (
                <div className='quote__container' key={quote.id}>
                    <h1>{quote.author}</h1>
                    <p className='quote__container__quote__text'>{quote.text}</p>
                    <h4 className='quote__container__category'>{quote.category}</h4>
                </div>
            ))}
        </section>
    )
}

export default UserProfile;