import styles from './Search.module.scss'
import useForm from '../../hooks/useForm';
import useSearch from '../../hooks/useSearch';
import Toaster from '../../components/toaster/Toaster'
import { MdClose } from 'react-icons/md';

const initialValues = {
    searchText: ''
}

const Search = () => {

    const { values, handleChange, handleClear } = useForm(initialValues);
    const { handleSubmit, error } = useSearch();

    return (
        <div>
            <form
                className={styles.search__form}
                onSubmit={(e) => handleSubmit(e, values)}>
                <label
                    className={styles.search__label}
                >
                    Search by author
                </label>
                <div className={styles.input__wrapper}>
                    <input
                        value={values.searchText}
                        onChange={handleChange}
                        className={styles.search__input}
                        name='searchText'
                        type="text" 
                        placeholder='e.g. Dostoevsky, Irvine Welsh'/>
                    <MdClose
                        onClick={handleClear}
                        className={styles.clear__icon}
                    />
                </div>
                <button className={styles.search__button}>Search</button>
            </form>
            {error && <Toaster className='toaster' message={error} />}
        </div>
    )
}

export default Search;