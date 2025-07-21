import { useNavigate } from "react-router-dom";

const EditButton = ({text, id}) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/quotes/edit-quote/${id}`)
    }

    return (
        <button onClick={clickHandler}>{text}</button>
    )
}

export default EditButton;