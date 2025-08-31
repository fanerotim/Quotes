import './AddQuote.scss'
import useForm from '../../hooks/useForm';
import useAddQuote from '../../hooks/useAddQuote';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../utils/genres';

const initialValues = {
    author: '',
    text: '',
    category: ''
}

const AddQuote = () => {

    const { values, handleChange } = useForm(initialValues);
    const { addQuote, error, isLoading } = useAddQuote();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newQuote = await addQuote(values);
            navigate('/quotes')
        } catch (err) {
            console.error(err);
        }
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
                        placeholder='Enter author here'
                        name='author'
                        type="text" />
                </section>
                <section>
                    <label>Text</label>
                    <textarea
                        onChange={handleChange}
                        value={values.text}
                        placeholder='Enter text here'
                        name='text'
                        type="text" />
                </section>
                <section>
                    <label>Category</label>
                    <select
                        onChange={handleChange}
                        name="category">
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
        </div>
    )
}

export default AddQuote;