import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import './EditQuote.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useEditQuote from '../../hooks/useEditQuote';
import useGetQuote from '../../hooks/useGetQuote';
import { useAuthContext } from '../../hooks/useAuthContext';

const EditQuote = () => {

    const [quote, setQuote] = useState({
        author: '',
        text: '',
        category: ''
    })

    const { quoteId } = useParams();
    const { values, handleChange } = useForm(quote);
    const { edit } = useEditQuote();
    const { getQuote } = useGetQuote();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        // this piece of code makes sure edit form is prepopulated with accurate data on initial load
        const newQuote =
            getQuote(quoteId)
                .then(result => setQuote(result))
                .catch(err => console.log(err))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedQuote = await edit(values, quoteId);
        } catch (err) {
            // if token has been modified (in local storage) and didn't verify
            // then logout and navigate to login
            // TODO: show an error to the user
            dispatch({
                type: 'LOGOUT'
            });
            navigate('/users/login');
        }
    }

    return (
        <section className='edit-quote__container'>
            <h1>Edit quote</h1>

            <form
                onSubmit={handleSubmit}>
                <section>
                    <label>Author</label>
                    <input
                        onChange={handleChange}
                        value={values.author}
                        name='author'
                    />
                </section>

                <section>
                    <label>Text</label>
                    <textarea
                        onChange={handleChange}
                        value={values.text}
                        name="text">
                    </textarea>
                </section>

                <section>
                    <label>Category</label>
                    <select
                        onChange={handleChange}
                        name="category">
                        <option value="sport">Sport</option>
                        <option value="comedy">Comedy</option>
                        <option value="history">History</option>
                    </select>
                </section>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default EditQuote;