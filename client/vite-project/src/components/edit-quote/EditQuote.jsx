import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import './EditQuote.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useEditQuote from '../../hooks/useEditQuote';
import useGetQuote from '../../hooks/useGetQuote';
import { CATEGORIES } from '../../utils/genres';
import BackButton from '../back-button/BackButton';

const EditQuote = () => {

    const [quote, setQuote] = useState({
        author: '',
        text: '',
        category: ''
    })

    const { quoteId } = useParams();
    const { values, handleChange } = useForm(quote);
    const { edit, error, isLoading } = useEditQuote();
    const { getQuote } = useGetQuote();
    const navigate = useNavigate();

    useEffect(() => {
        // this piece of code makes sure edit form is prepopulated with accurate data on initial load
        const newQuote =
            getQuote(quoteId)
                .then(result => setQuote(result))
                .catch(err => console.error(err))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await edit(values, quoteId);
            navigate(`/quotes/${quoteId}`)
        } catch (err) {
            // logging error for now, but could be used to show a toast;
            console.error(err);
        }
    }

    return (
        <section className='edit-quote__container'>
            <BackButton/>
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
                        name="category"
                        // TODO: Fix this - find a better way to implement it
                        // Using toLowerCase() as values in genres.js are written in lower case, so if I do not lowercase it, it does not get detected and updated in the UI.
                        value={values.category.toLowerCase()}>
                        {CATEGORIES.map(category => (
                            <option
                                key={category.value}
                                value={category.value}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </section>
                {error && <p className='errorMessage'>{error}</p>}
                <button disabled={isLoading}>Submit</button>
            </form>
        </section>
    )
}

export default EditQuote;