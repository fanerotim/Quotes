import './Toaster.scss';
import { useState } from 'react';

const Toaster = ({ message }) => {

    const [show, setShow] = useState(null)

    setTimeout(() => {
        setShow(true)
    }, 1000)

    return (
        <>
            {show && <article className='toaster-container'>
                <p>{message}</p>
            </article>}
        </>
    )
}

export default Toaster;