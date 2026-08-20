import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  
  const navigate = useNavigate();

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError(''); 

    try {
      const respuesta = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!respuesta.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const datos = await respuesta.json();
      
      localStorage.setItem('usuarioId', datos.usuarioId);
      
      navigate('/turnos');
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensajeError('Correo o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <div className="container login-container">
      <section className="card login-card">
        <h2 style={{ textAlign: 'center' }}>🔐 Iniciar Sesión</h2>
        
        {mensajeError && (
          <div style={{ color: '#ff6b6b', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
            {mensajeError}
          </div>
        )}

        <form onSubmit={iniciarSesion} className="login-form">
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-input"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-input"
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn-submit" style={{ width: '100%', marginTop: '10px' }}>
            INGRESAR
          </button>
        </form>
      </section>
    </div>
  );
}