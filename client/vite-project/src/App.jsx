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
import UserProfile from './components/user-profile/UserProfile';

function App() {

  const { sessionExpired } = useAuthContext();

  return (
    <div className='app-container'>
      <Navigation />
      {sessionExpired && <SessionExpired />}

      <Routes>
        <Route index element={<Home />}></Route>

        <Route path='users'>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='user-profile' element={<UserProfile />}></Route>
        </Route>

        <Route path='quotes'>
          <Route index element={<Quotes />}></Route>
          <Route path=':quoteId' element={<QuoteDetails />}></Route>
          <Route path='add-quote' element={<AddQuote />}></Route>
          <Route path='edit-quote/:quoteId' element={<EditQuote />}></Route>
        </Route>

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
