import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp'; // Import your main component
import './index.css'; // Import your global styles

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root') // Ensure this matches the id in your index.html
);