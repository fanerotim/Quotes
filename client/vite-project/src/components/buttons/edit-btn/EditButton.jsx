import styles from './EditButton.module.scss';
import { useNavigate } from "react-router-dom";

const EditButton = ({ id }) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/quotes/edit-quote/${id}`)
    }

    return (
        <button className={styles.edit__button}
            onClick={clickHandler}>
            Edit
        </button>
    )
}

export default EditButton;