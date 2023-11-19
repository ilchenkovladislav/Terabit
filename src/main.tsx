import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary fallback={<p>Что-то пошло не так</p>}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
);
