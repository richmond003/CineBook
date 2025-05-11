import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import { AuthenProvider } from './context/AuthenContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthenProvider>
          <App />
        </AuthenProvider>
    </BrowserRouter>
  </StrictMode>,
)
