import './Search.scss'
import useForm from '../../hooks/useForm';
import useSearch from '../../hooks/useSearch';

const initialValues = {
    searchText: ''
}

const Search = () => {

    const { values, handleChange } = useForm(initialValues);
    const { handleSubmit } = useSearch();

    return (
        <div>
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
        </div>
    )
}

export default Search;