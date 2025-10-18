import styles from './LastThreeQuotes.module.scss';
import useGetLastThreeQuotes from '../../hooks/useGetLastThreeQuotes';
import QuoteCard from '../quote-card/QuoteCard';

const LastThreeQuotes = () => {

    const { lastThreeQuotes } = useGetLastThreeQuotes();
    
    return (
        <>
            {lastThreeQuotes.map(q => {
                    return <p>{q.text}</p>
            })} 
        </>
    )
}

export default LastThreeQuotes;