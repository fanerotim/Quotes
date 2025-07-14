import './App.scss'
import AddQuote from './components/add-quote/addQuote';
import Home from './components/home/Home';
import Quotes from './components/quotes/Quotes';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quotes' element={<Quotes />}></Route>
        <Route path='/quotes/add-quote' element={<AddQuote/>}></Route>
      </Routes>
    </>
  )
}

export default App
