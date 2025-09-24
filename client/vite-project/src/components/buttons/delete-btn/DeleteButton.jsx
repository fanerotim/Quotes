import useDelete from "../../../hooks/useDelete";
import DeleteModal from "../../delete-modal/DeleteModal";

const DeleteButton = ({ quoteId }) => {

    const { deleteOne } = useDelete();

    const clickHandler = async () => {
        console.log('delete')
        // const deletedItem = await deleteOne('delete-quote', {"id": quoteId})
    }

    return (
        <>
            <DeleteModal />
            <button onClick={clickHandler}>Delete</button>
        </>
    )
}

export default DeleteButton;