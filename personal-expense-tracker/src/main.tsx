import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Get the root element and assert it's not null
const rootElement = document.getElementById("root")!;

// Create root and render the app
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
