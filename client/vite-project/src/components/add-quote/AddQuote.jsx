import styles from './AddQuote.module.scss'
import useForm from '../../hooks/useForm';
import useAddQuote from '../../hooks/useAddQuote';
import globalStyles from '../../App.module.scss'
import Loader from '../loader/Loader';
import Toaster from '../toaster/Toaster';
import SuccessModal from '../success-modal/SuccessModal';
import Select from '../select/Select';

const initialValues = {
    author: '',
    text: '',
    category: ''
}

const AddQuote = () => {

    const { values, handleChange } = useForm(initialValues);
    const { 
        handleSubmit,
        isLoading,
        error,
        success
    } = useAddQuote();

    return (
        <div className={styles.add__form__container}>

            <div className={styles.add__form__text}>
                <h1 className={styles.add__form__text__heading}>Add</h1>
                <p className={styles.add__form__text__subheading}>Add a quote</p>
            </div>

            {isLoading
                ?
                <div
                    className={styles.add__form__loader__container}
                >
                    <Loader />
                </div>

                : success ?

                    <div
                        className={styles.add__form__success__modal__container}
                    >
                        <SuccessModal />
                    </div>

                    :

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

                            <div
                                onClick={handleChange}
                                className={styles.custom__select__wrapper}
                            >
                                <Select
                                    className={styles.add__form__select}
                                />
                            </div>
                        </section>

                        <button
                            className={globalStyles.submit__button}
                        >
                            Add
                        </button>
                    </form>
            }

            <div
                className={styles.add__form__toaster__container}
            >
                <Toaster message={error?.message} />
            </div>
        </div>
    )
}

export default AddQuote;