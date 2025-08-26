import './App.scss'
import Home from './components/home/Home';
import Quotes from './components/quotes/Quotes';
import AddQuote from './components/add-quote/addQuote';
import EditQuote from './components/edit-quote/EditQuote';
import { Routes, Route } from 'react-router-dom'
import QuoteDetails from './components/quote-details/QuoteDetails';
import Navigation from './components/navigation/Navigation';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import NotFound from './components/not-found/NotFound';
import Login from './components/login/Login';
import SessionExpired from './components/session-expired/SessionExpires';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { sessionExpired } = useAuthContext();

  return (
    <div className='app-container'>
      <Navigation />
      {sessionExpired && <SessionExpired />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quotes' element={<Quotes />}></Route>
        <Route path='/quotes/:quoteId' element={<QuoteDetails />}></Route>
        <Route path='/quotes/add-quote' element={<AddQuote />}></Route>
        <Route path='/quotes/edit-quote/:quoteId' element={<EditQuote />}></Route>
        <Route path='/users/register' element={<Register />}>Register</Route>
        <Route path='/users/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
