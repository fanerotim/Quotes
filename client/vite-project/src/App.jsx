import './App.scss'
import Home from './components/home/Home';
import Quotes from './components/quotes/Quotes';
import AddQuote from './components/add-quote/addQuote';
import EditQuote from './components/edit-quote/EditQuote';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quotes' element={<Quotes />}></Route>
        <Route path='/quotes/add-quote' element={<AddQuote/>}></Route>
        <Route path='/quotes/edit-quote' element={<EditQuote/>}></Route>
      </Routes>
    </>
  )
}

export default App
