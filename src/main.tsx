
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FarmDataProvider } from './context/FarmDataContext.tsx'

// Check if user is logged in
const checkLoginStatus = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// Run login check
checkLoginStatus();

createRoot(document.getElementById("root")!).render(
  <FarmDataProvider>
    <App />
  </FarmDataProvider>
);
