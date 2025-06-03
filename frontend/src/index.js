import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa o CSS global (vamos criar ele logo abaixo)
import App from './App'; // Importa o nosso componente App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);