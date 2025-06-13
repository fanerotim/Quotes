import './App.scss'
import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_QUOTES_URL)
      .then(response => response.json())
      .then(data => setQuotes(data));
  }, [])

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
