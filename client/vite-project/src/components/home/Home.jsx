import { useState } from 'react';

const Home = () => {

    const [bindValue, setBindValue] = useState(null);
    const [url, setUrl] = useState(null);
    const [data, setData] = useState(null);

    const printBindValue = (method, url, data) => {
        setBindValue(method);
        setUrl(url);
        setData(data);
    }

    const get = printBindValue.bind('', 'GET');
    const post = printBindValue.bind('', 'POST');

    return (
        <>
            <h1>Welcome to My Quotes App</h1>
            <button
                onClick={() => {
                    post('http://url.com', 'random data')
                }}
            >Output Bind value</button>
            <p>{bindValue}</p>
            <p>{url}</p>
            <p>{data}</p>
        </>
    )
}

export default Home;