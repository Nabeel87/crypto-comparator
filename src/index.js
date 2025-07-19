import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ToggleThemeProvider } from './ToggleThemeContext';
import { CryptoProvider } from './context/CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <CryptoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CryptoProvider>
    </ToggleThemeProvider>
  </React.StrictMode>
);


