import './Search.scss'
import useForm from '../../hooks/useForm';
import useSearch from '../../hooks/useSearch';
import Toaster from '../../components/toaster/Toaster'

const initialValues = {
    searchText: ''
}

const Search = () => {

    const { values, handleChange } = useForm(initialValues);
    const { handleSubmit, error } = useSearch();

    return (
        <div className='wrapper'>
            <form
                onSubmit={(e) => handleSubmit(e, values)}>
                <label>
                    Search by author
                </label>
                <input
                    name='searchText'
                    value={values.searchText}
                    onChange={handleChange}
                    type="text" />
                <button>Search</button>
            </form>
            {error && <Toaster className='toaster' message={error}/>}
        </div>
    )
}

export default Search;