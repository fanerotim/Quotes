import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import './EditQuote.scss'
import { useParams } from 'react-router-dom';
import useEditQuote from '../../hooks/useEditQuote';
import useGetQuote from '../../hooks/useGetQuote';

const EditQuote = () => {

    const { quoteId } = useParams();
    const { values, handleChange } = useForm();
    const { edit } = useEditQuote();
    const { getQuote } = useGetQuote();
    const [quote, setQuote] = useState({
        author: '',
        text: '',
        category: ''
    })

    useEffect(() => {
        const newQuote = 
            getQuote(quoteId)
            .then(result => setQuote(result))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedQuote = edit(values, quoteId)
    }

    return (
        <>
            <h1>Edit quote</h1>

            <form
                onSubmit={handleSubmit}>
                <section>
                    <label>Author</label>
                    <input
                        onChange={handleChange}
                        value={quote.author}
                        name='author'
                    />
                </section>

                <section>
                    <label>Text</label>
                    <textarea
                        onChange={handleChange}
                        value={quote.text}
                        name="text">
                    </textarea>
                </section>

                <section>
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
        </>
    )
}

export default EditQuote;