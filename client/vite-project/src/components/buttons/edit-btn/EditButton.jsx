import { useNavigate } from "react-router-dom";

const EditButton = ({ id }) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/quotes/edit-quote/${id}`)
    }

    return (
        <button onClick={clickHandler}>Edit</button>
    )
}

export default EditButton;