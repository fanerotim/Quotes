import useForm from '../../hooks/useForm';
import './EditQuote.scss'
import { useParams } from 'react-router-dom';
import useEditQuote from '../../hooks/useEditQuote';

const EditQuote = () => {

    const { quoteId } = useParams();
    const { values, handleChange } = useForm();
    const { edit } = useEditQuote();

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
                        name='author'
                    />
                </section>

                <section>
                    <label>Text</label>
                    <textarea
                        onChange={handleChange}
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