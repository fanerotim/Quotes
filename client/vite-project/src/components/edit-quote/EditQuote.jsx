import useForm from '../../hooks/useForm';
import styles from './EditQuote.module.scss'
import { CATEGORIES } from '../../utils/genres';
import BackButton from '../back-button/BackButton';
import useEditQuote from '../../hooks/useEditQuote';


const EditQuote = () => {

    const {
        handleSubmit,
        quote
    } = useEditQuote();

    const { values, handleChange } = useForm(quote);

    return (
        <section
            className={styles.edit__form__container}
        >

            <div
                className={styles.back__button__container}
            >
                <BackButton />
            </div>

            <div
                className={styles.edit__form__text__container}
            >
                <h1
                    className={styles.edit__form__text__container__heading}
                >
                    Edit
                </h1>
            </div>

            <form
                onSubmit={(e) => handleSubmit(e, values)}
                className={styles.edit__form}
            >

                <section
                    className={styles.form__data}
                >
                    <label
                        className={styles.edit__form__label}
                    >
                        Author
                    </label>
                    
                    <input
                        onChange={handleChange}
                        className={styles.edit__form__input}
                        value={values?.author}
                        name='author'
                    />
                </section>

                <section
                    className={styles.form__data}
                >
                    <label
                        className={styles.edit__form__label}
                    >
                        Text
                    </label>
                    <textarea
                        onChange={handleChange}
                        className={styles.edit__form__textarea}
                        value={values?.text}
                        name="text">
                    </textarea>
                </section>

                <section
                    className={styles.form__data}
                >
                    <label
                        className={styles.edit__form__label}
                    >
                        Category
                    </label>
                    <select
                        onChange={handleChange}
                        className={styles.edit__form__select}
                        name="category"
                        // TODO: Fix this - find a better way to implement it
                        // Using toLowerCase() as values in genres.js are written in lower case, so if I do not lowercase it, it does not get detected and updated in the UI.
                        value={values?.category.toLowerCase()}>
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
                    className={styles.edit__form__submit__button}
                >
                    Submit
                </button>
            </form>
        </section>
    )
}

export default EditQuote;