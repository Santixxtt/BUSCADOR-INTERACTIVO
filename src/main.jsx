import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Usa basename solo en producción (GitHub Pages)
const base = import.meta.env.PROD ? '/BUSCADOR-INTERACTIVO' : '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={base}>
    <AuthProvider>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas dentro de PrivateRoute */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
