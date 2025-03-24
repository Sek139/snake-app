import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Function to initialize the React app in a specific container
window.initializeReactApp = (container) => {
  // Check if the container is a valid DOM element
  if (!(container instanceof Element)) {
    console.error("Invalid container provided to initializeReactApp. It must be a DOM element.");
    return;
  }
  
  // Use ReactDOM.createRoot for React 18+
  const customRoot = ReactDOM.createRoot(container);
  customRoot.render(<App />);
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
