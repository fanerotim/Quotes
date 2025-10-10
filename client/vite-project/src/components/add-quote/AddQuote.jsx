import styles from './AddQuote.module.scss'
import useForm from '../../hooks/useForm';
import useAddQuote from '../../hooks/useAddQuote';
import { CATEGORIES } from '../../utils/genres';

const initialValues = {
    author: '',
    text: '',
    category: ''
}

const AddQuote = () => {

    const { values, handleChange } = useForm(initialValues);
    const { handleSubmit } = useAddQuote();

    return (
        <div className={styles.add__form__container}>

            <div className={styles.add__form__text}>
                <h1 className={styles.add__form__text__heading}>Contribute</h1>
                <p className={styles.add__form__text__subheading}>Add a quote</p>
            </div>

            <form
                onSubmit={(e) => handleSubmit(e, values)}
                className={styles.add__form}>

                <section
                    className={styles.add__form__form__data}
                >
                    <label
                        className={styles.add__form__label}
                    >
                        Author
                    </label>
                    <input
                        onChange={handleChange}
                        value={values.author}
                        className={styles.add__form__input}
                        placeholder='Minimum 8 characters'
                        name='author'
                        type="text"
                        required
                        minLength={8} />
                </section>

                <section
                    className={styles.add__form__form__data}
                >
                    <label
                        className={styles.add__form__label}
                    >
                        Text
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={values.text}
                        className={styles.add__form__textarea}
                        placeholder='Minimum 15 characters'
                        name='text'
                        type="text"
                        required
                        minLength={15} />
                </section>

                <section
                    className={styles.add__form__form__data}
                >
                    <label
                        className={styles.add__form__label}
                    >
                        Category
                    </label>
                    <select
                        onChange={handleChange}
                        className={styles.add__form__select}
                        name="category"
                        required
                    >
                        {CATEGORIES.map(category => (
                            <option
                                key={category.value}
                                value={category.value}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </section>

                <button 
                    className={styles.add__form__button}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddQuote;