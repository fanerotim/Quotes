import useDelete from "../../../hooks/useDelete";

const DeleteButton = ({ quoteId }) => {

    const { deleteOne } = useDelete();

    const clickHandler = async () => {
        const deletedItem = await deleteOne('delete-quote', {"id": quoteId})
    }

    return (
        <button onClick={clickHandler}>Delete</button>
    )
}

export default DeleteButton;