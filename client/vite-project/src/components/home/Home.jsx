import styles from './Home.module.scss'
import LastThreeQuotes from '../last-three-quotes/LastThreeQuotes';


const Home = () => {

    return (
        <div
            className={styles.home__container}
        >
            <div
                className={styles.home__text__container}
            >
                <h1
                    className={styles.home__heading}
                >
                    Quotes
                </h1>
                <p
                    className={styles.home__subheading}
                >
                    I hope you enjoy the quotes we have collected
                </p>
            </div>

            <LastThreeQuotes />
        </div>
    )
}

export default Home;