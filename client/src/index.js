import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional CSS file for styling
import App from './App';

// Render the App component into the root div in public/index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
