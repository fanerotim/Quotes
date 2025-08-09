import './AddQuote.scss'
import useForm from '../../hooks/useForm';
import useAddQuote from '../../hooks/useAddQuote';

const initialValues = {
    author: '',
    text: '',
    category: ''
}

const AddQuote = () => {

    const { values, handleChange } = useForm(initialValues);
    const { addQuote } = useAddQuote();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addQuote(values);
    }

    return (
        <div className='add-form__container'>
            <form
                onSubmit={(e) => handleSubmit(e)}>
                <section>
                    <label>Author</label>
                    <input
                        onChange={handleChange}
                        value={values.author}
                        name='author'
                        type="text" />
                </section>

                <section>
                    <label>Text</label>
                    <input
                        onChange={handleChange}
                        value={values.text}
                        name='text'
                        type="text" />
                </section>

                <section>
                    <label>Category</label>
                    <select
                        onChange={handleChange}
                        name="category"
                        value={values.category}>
                        <option value="sport">Sport</option>
                        <option value="comedy">Comedy</option>
                        <option value="history">History</option>
                    </select>
                </section>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddQuote;