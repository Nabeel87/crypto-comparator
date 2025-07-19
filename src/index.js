import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import {ToggleThemeProvider} from './ToggleThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleThemeProvider>
  </React.StrictMode>
);


