import './Home.module.scss'
import LastThreeQuotes from '../last-three-quotes/LastThreeQuotes';


const Home = () => {
    

    return (
        <div
            className='home-container'
        >
            <h1 className='home-heading'>Welcome to My Quotes App</h1>
            <LastThreeQuotes />
            <h1 className='info'>Viewport with is: {width}</h1>
        </div>
    )
}

export default Home;