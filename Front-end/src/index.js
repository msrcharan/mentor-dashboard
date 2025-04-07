import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);