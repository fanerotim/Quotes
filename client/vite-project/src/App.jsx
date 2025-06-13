import './App.scss'
import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isUnmounting, setIsUnmounting] = useState(false)  

  useEffect(() => {
    fetch(import.meta.env.VITE_QUOTES_URL)
      .then(response => response.json())
      .then(data => {
        setQuotes(data)
        setIsUnmounting(false)
      });

    return (() => setIsUnmounting(true))
  }, [])

  if (isUnmounting) {
    return (<h1>Loading...</h1>)
  }

  return (
    <>
      <section>
        {quotes.map(q => (
          <div 
            key={q.id} 
            className='item'>
            <h3>{q.author}</h3>
            <p>{q.text}</p>
          </div>
          
        ))}
      </section>
    </>
  )
}







export default App
