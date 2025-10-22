import './UserProfile.scss'
import UpdatePassword from './update-password/UpdatePassword';
import { Link } from 'react-router-dom';
import useGetUserQuotes from '../../hooks/useGetUserQuotes';

const UserProfile = () => {

    const { email, userQuotes } = useGetUserQuotes();

    return (
        <section className='page__wrapper'>
            {/* TODO; give auth default values as if it's not optionally chained app breaks */}
            {email && <p>Welcome, {email}!</p>}
            <UpdatePassword />
            <h1>Please find the quotes you have added below:</h1>
            {/* TODO: fix this. It would be better if we can not use conditional chaining */}
            {userQuotes?.map((quote) => (
                <div className='quote__container' key={quote.id}>
                    <h1>{quote.author}</h1>
                    <p className='quote__container__quote__text'>{quote.text}</p>
                    <h4 className='quote__container__category'>{quote.category}</h4>
                    <Link to={`/quotes/${quote.id}`}>Modify or Delete</Link>
                </div>
            ))}
        </section>
    )
}

export default UserProfile;