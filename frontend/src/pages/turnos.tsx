import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Turno {
  id: string;
  fechaHora: string;
  estado: string;
}

export default function TurnosPage() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const navigate = useNavigate();

  const miUsuarioId = localStorage.getItem('usuarioId');

  const cargarTurnos = () => {
    fetch('http://localhost:3000/turnos')
      .then((respuesta) => respuesta.json())
      .then((datos) => setTurnos(datos))
      .catch((error) => console.error('Error al traer los turnos:', error));
  };

  const agendarTurno = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/turnos/agendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        fechaHora: nuevaFecha,
        clienteId: miUsuarioId,  
        profesionalId: "medico-prueba-456" 
      }),
    })
      .then(() => {
        setNuevaFecha('');
        cargarTurnos();
      })
      .catch((error) => console.error('Error al agendar:', error));
  };

  const actualizarEstado = (id: string, nuevoEstado: string) => {
    fetch(`http://localhost:3000/turnos/${id}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
      .then(() => cargarTurnos())
      .catch((error) => console.error('Error al actualizar:', error));
  };

  useEffect(() => {
    if (!miUsuarioId) {
      navigate('/login');
    } else {
      cargarTurnos();
    }
  }, [miUsuarioId, navigate]);

  const formatearFecha = (fechaIso: string) => {
    if (!fechaIso) return '';
    const fecha = new Date(fechaIso);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaSemana = dias[fecha.getDay()];
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, '0');
    const min = String(fecha.getMinutes()).padStart(2, '0');
    
    return `${diaSemana} ${dia}/${mes}/${anio}, ${hora}:${min}hs`;
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioId');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="main-title" style={{ marginBottom: 0 }}>Gestor de Turnos 📅</h1>
        <button onClick={cerrarSesion} className="btn-icon" style={{ padding: '8px 16px', color: '#ff6b6b' }}>
          Cerrar Sesión
        </button>
      </div>
      
      <section className="card">
        <h2>Agendar Nuevo Turno</h2>
        <form onSubmit={agendarTurno} className="turno-form">
          <div className="input-group">
            <label>Seleccionar Fecha y Hora (DD/MM/AAAA, HH:MM)</label>
            <input 
              type="datetime-local" 
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
              required
              className="date-input"
            />
          </div>
          <button type="submit" className="btn-submit">
            + AGENDAR TURNO
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Mis Turnos</h2>
        <ul className="turno-list">
          {turnos.map((turno) => (
            <li key={turno.id} className="turno-item">
              <span className="turno-fecha">
                Fecha: {formatearFecha(turno.fechaHora)}
              </span>
              
              <div className="turno-acciones">
                <span className={`badge badge-${turno.estado.toLowerCase()}`}>
                  {turno.estado}
                </span>
                
                {turno.estado.toUpperCase() === 'PENDIENTE' && (
                  <div className="botones-accion">
                    <button onClick={() => actualizarEstado(turno.id, 'CONFIRMADO')} className="btn-icon" title="Confirmar">✔️</button>
                    <button onClick={() => actualizarEstado(turno.id, 'CANCELADO')} className="btn-icon" title="Cancelar">❌</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}