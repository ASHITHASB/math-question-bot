import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import App from "./App";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
