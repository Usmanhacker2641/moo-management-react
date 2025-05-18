
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FarmDataProvider } from './context/FarmDataContext.tsx'

createRoot(document.getElementById("root")!).render(
  <FarmDataProvider>
    <App />
  </FarmDataProvider>
);
