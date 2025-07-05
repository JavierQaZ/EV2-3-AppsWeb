import React, { useState } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import readerService from '../../services/readerService';
import './Lector.css';

const Lector = () => {
    // Estados para el formulario
    const [email, setEmail] = useState('');
    const [datosLector, setDatosLector] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [multas, setMultas] = useState([]);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
    const [cargandoActualizacion, setCargandoActualizacion] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Formatear fecha para mostrar
    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-CL');
    };

    // Obtener estado legible
    const obtenerEstadoTexto = (state) => {
        return state ? 'Activo' : 'Bloqueado';
    };

    // Manejar búsqueda de lector
    const handleBuscarLector = async () => {
        if (!email.trim()) {
            setMensaje('Por favor ingresa un email');
            return;
        }

        setCargandoBusqueda(true);
        setMensaje('');
        setDatosLector(null);
        setReservas([]);
        setMultas([]);

        try {
            // Buscar datos del lector
            const lector = await readerService.findReaderByEmail(email);
            setDatosLector(lector);

            // Buscar reservas/préstamos
            try {
                const reservasData = await readerService.findReturnByEmail(email);
                setReservas(reservasData || []);
            } catch (reservasError) {
                console.warn('No se pudieron cargar las reservas:', reservasError);
                setReservas([]);
            }

            // Buscar multas
            try {
                const multasData = await readerService.findFineByEmail(email);
                setMultas(multasData || []);
            } catch (multasError) {
                console.warn('No se pudieron cargar las multas:', multasError);
                setMultas([]);
            }

            setMensaje('Lector encontrado exitosamente');

        } catch (error) {
            console.error('Error al buscar lector:', error);
            setMensaje('Error al buscar el lector. Verifica que el email exista.');
            setDatosLector(null);
            setReservas([]);
            setMultas([]);
        } finally {
            setCargandoBusqueda(false);
        }
    };

    // Manejar bloqueo/desbloqueo del lector
    const handleToggleBloqueo = async () => {
        if (!datosLector) return;

        setCargandoActualizacion(true);
        setMensaje('');

        try {
            const nuevoEstado = !datosLector.state;
            
            await readerService.updateStatus(email, nuevoEstado);
            
            // Actualizar estado local
            setDatosLector(prev => ({
                ...prev,
                state: nuevoEstado
            }));

            const estadoTexto = nuevoEstado ? 'Desbloqueado' : 'Bloqueado';
            setMensaje(`Lector ${estadoTexto} exitosamente`);

        } catch (error) {
            console.error('Error al actualizar estado:', error);
            setMensaje('Error al actualizar el estado del lector');
        } finally {
            setCargandoActualizacion(false);
        }
    };

    return (
        <>
            <HeaderAdmin />
            <div className="lector-container">
                <h1 className="titulo-principal">Busca Lector</h1>
                {/* Sección de búsqueda */}
                <div className="seccion-busqueda">
                    <div className="grupo-busqueda">
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-busqueda"
                            onKeyDown={(e) => e.key === 'Enter' && handleBuscarLector()}
                        />
                        <button
                            type="button"
                            onClick={handleBuscarLector}
                            className="boton-buscar"
                            disabled={cargandoBusqueda}
                        >
                            {cargandoBusqueda ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>

                {/* Sección de resultados */}
                {datosLector && (
                    <div className="seccion-resultados">
                        {/* Sección de tablas */}
                        <div className="tablas-container">
                            {/* Datos del Lector */}
                            <div className="tabla-seccion">
                                <h2 className="titulo-tabla">DATOS LECTOR</h2>
                                <div className="tabla-contenido">
                                    <div className="fila-dato">
                                        <span className="etiqueta">Nombre:</span>
                                        <span className="valor">{datosLector.name} {datosLector.lastName}</span>
                                    </div>
                                    <div className="fila-dato">
                                        <span className="etiqueta">Email:</span>
                                        <span className="valor">{datosLector.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reservas/Préstamos */}
                            <div className="tabla-seccion">
                                <h2 className="titulo-tabla">PRÉSTAMOS</h2>
                                <div className="tabla-contenido">
                                    {reservas.length > 0 ? (
                                        <div className="tabla-datos">
                                            <div className="tabla-header">
                                                <span>Título</span>
                                                <span>Autor</span>
                                                <span>Fecha Préstamo</span>
                                                <span>Fecha Devolución</span>
                                                <span>Estado</span>
                                            </div>
                                            {reservas.map((reserva) => (
                                                <div key={reserva.id} className="tabla-fila">
                                                    <span>{reserva.title}</span>
                                                    <span>{reserva.author}</span>
                                                    <span>{formatearFecha(reserva.dateBooking)}</span>
                                                    <span>{formatearFecha(reserva.dateReturn)}</span>
                                                    <span className={`estado ${reserva.state ? 'activa' : 'inactiva'}`}>
                                                        {reserva.state ? 'Activo' : 'Devuelto'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="sin-datos">No hay préstamos registrados</p>
                                    )}
                                </div>
                            </div>

                            {/* Multas */}
                            <div className="tabla-seccion">
                                <h2 className="titulo-tabla">MULTAS</h2>
                                <div className="tabla-contenido">
                                    {multas.length > 0 ? (
                                        <div className="tabla-datos">
                                            <div className="tabla-header">
                                                <span>Descripción</span>
                                                <span>Monto</span>
                                                <span>Estado</span>
                                            </div>
                                            {multas.map((multa) => (
                                                <div key={multa.id} className="tabla-fila">
                                                    <span>{multa.description}</span>
                                                    <span>${multa.amount.toLocaleString('es-CL')}</span>
                                                    <span className={`estado ${multa.state ? 'pendiente' : 'pagada'}`}>
                                                        {multa.state ? 'Pendiente' : 'Pagada'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="sin-datos">No hay multas registradas</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Estado del lector y botón de bloqueo */}
                        <div className="estado-lector-section">
                            <div className="estado-info">
                                <span className="estado-label">Estado Lector:</span>
                                <span className={`estado-valor ${datosLector.state ? 'Activo' : 'Bloqueado'}`}>
                                    {obtenerEstadoTexto(datosLector.state)}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleToggleBloqueo}
                                className={`boton-bloqueo ${datosLector.state ? 'Bloquear' : 'Desbloquear'}`}
                                disabled={cargandoActualizacion}
                            >
                                {cargandoActualizacion
                                    ? 'Actualizando...'
                                    : (datosLector.state ? 'Bloquear' : 'Desbloquear')
                                }
                            </button>
                        </div>
                    </div>
                )}

                {/* Mensajes */}
                {mensaje && (
                    <div className={`mensaje ${
                        mensaje.toLowerCase().includes('error') ? 'mensaje-error' :
                        mensaje.toLowerCase().includes('exitosamente') || mensaje.toLowerCase().includes('encontrado') ? 'mensaje-exito' : 'mensaje-info'
                    }`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </>
    );
};

export default Lector;