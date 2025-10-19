import './Home.module.scss'
import LastThreeQuotes from '../last-three-quotes/LastThreeQuotes';


const Home = () => {
    

    return (
        <div
            className='home-container'
        >
            <h1 className='home-heading'>Welcome to My Quotes App</h1>
            <LastThreeQuotes />
        </div>
    )
}

export default Home;