import useForm from '../../hooks/useForm';
import styles from './EditQuote.module.scss'
import { CATEGORIES } from '../../utils/genres';
import BackButton from '../back-button/BackButton';
import useEditQuote from '../../hooks/useEditQuote';
import Loader from '../loader/Loader';
import Toaster from '../toaster/Toaster';
import SuccessModal from '../success-modal/SuccessModal';
import Select from '../select/Select';

const EditQuote = () => {

    const {
        handleSubmit,
        quote,
        isLoading,
        error,
        success
    } = useEditQuote();

    const { values, handleChange } = useForm(quote);

    return (
        <section
            className={styles.edit__form__container}
        >

            {isLoading
                ?
                <div
                    className={styles.edit__form__loader__container}
                >
                    <Loader />

                </div>

                :
                success 
                    ?

                    <div
                        className={styles.edit__form__success__modal__container}
                    >
                        <SuccessModal />
                    </div>

                    :

                    <>
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
                                    value={values ? values.author : ''}
                                    name='author'
                                    required
                                    minLength={8}
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
                                <div
                                    onClick={handleChange}
                                    className={
                                        `${styles.custom__select__wrapper}
                                        ${styles.edit__form__select}`}
                                >
                                    <Select category={values?.category}/>
                                </div>
                            </section>
                            <button
                                className={styles.edit__form__submit__button}
                            >
                                Submit
                            </button>
                        </form>
                    </>}

            <div
                className={styles.edit__form__toaster__container}
            >
                <Toaster message={error?.message} />
            </div>

        </section >
    )
}

export default EditQuote;