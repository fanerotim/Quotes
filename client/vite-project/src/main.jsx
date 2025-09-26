import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContextProvider.jsx';
import HistoryContextProvider from './contexts/HistoryContextProvider.jsx';
import ScrollContextProvider from './contexts/ScrollContextProvider.jsx';
import { QuoteContextProvider } from './contexts/QuoteContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <QuoteContextProvider>
      <HistoryContextProvider>
        <ScrollContextProvider>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </ScrollContextProvider>
      </HistoryContextProvider>
    </QuoteContextProvider>
  </AuthContextProvider >

)
