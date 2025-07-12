import './App.scss'
import { useEffect, useState, useRef } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollCoordinates, setScrollCoordinantes] = useState({ x: 0, y: 0 });

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
      <section ref={(node) => {
        console.log('attached', node);

        return () => {
          console.log('detached', node)
        }
      }}>
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
