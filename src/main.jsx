import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/style.scss'
import { AdminAuthProvider } from './components/context/AdminAuth.jsx';
import { CustomerAuthProvider } from './components/context/CustomerAuth.jsx';


createRoot(document.getElementById('root')).render(
<StrictMode>
    <AdminAuthProvider>
      <CustomerAuthProvider>
        <App />
      </CustomerAuthProvider>
    </AdminAuthProvider>
  </StrictMode>
)
