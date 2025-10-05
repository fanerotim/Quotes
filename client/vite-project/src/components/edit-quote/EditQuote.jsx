import useForm from '../../hooks/useForm';
import useEditQuote from '../../hooks/useEditQuote';
import './EditQuote.scss'
import { CATEGORIES } from '../../utils/genres';
import BackButton from '../back-button/BackButton';
import useEdit from '../../hooks/useEdit';

const initialValues = {
    author: '',
    text: '',
    category: ''
}

const EditQuote = () => {

    const { values, handleChange } = useForm(initialValues);
    
    const {
        handleSubmit,
        quote,
        error,
        isLoading
    } = useEdit();

    return (
        <section className='edit-quote__container'>
            <BackButton />
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