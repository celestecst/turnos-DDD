import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import TurnosPage from './pages/turnos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si la ruta es /login, renderiza la pantalla de inicio de sesión */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Si la ruta es /turnos, renderiza tu gestor principal */}
        <Route path="/turnos" element={<TurnosPage />} />
        
        {/* Si el usuario escribe cualquier otra ruta, lo redirige al login por seguridad */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}