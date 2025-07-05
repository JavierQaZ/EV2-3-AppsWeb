import React, { useState } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import returnService from '../../services/returnService';
import './Devolucion.css';

const Devolucion = () => {
    // Estados para el formulario
    const [email, setEmail] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
    const [cargandoDevolucion, setCargandoDevolucion] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Manejar búsqueda de préstamos por email
    const handleBuscarPrestamos = async () => {
        if (!email.trim()) {
            setMensaje('Por favor ingresa un email');
            return;
        }

        setCargandoBusqueda(true);
        setMensaje('');

        try {
            const resultado = await returnService.findReturnByEmail(email);
            setResultadosBusqueda(resultado);
            if (resultado.length === 0) {
                setMensaje('No se encontraron préstamos activos para este email');
            }
        } catch (error) {
            console.error('Error al buscar préstamos:', error);
            setMensaje('Error al buscar los préstamos. Inténtalo de nuevo.');
            setResultadosBusqueda([]);
        } finally {
            setCargandoBusqueda(false);
        }
    };

    // Procesar devolución
    const handleDevolucion = async () => {
        if (!email.trim()) {
            setMensaje('Por favor ingresa un email');
            return;
        }

        if (!prestamoSeleccionado) {
            setMensaje('Por favor selecciona un préstamo para devolver');
            return;
        }

        setCargandoDevolucion(true);
        setMensaje('');

        try {
            // Formatear fecha como YYYY-MM-DD
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.getFullYear() + '-' +
                String(fechaActual.getMonth() + 1).padStart(2, '0') + '-' +
                String(fechaActual.getDate()).padStart(2, '0');

            const devolucionData = {
                bookingId: prestamoSeleccionado.id,
                fechaDevolucion: fechaFormateada
            };

            await returnService.createReturn(devolucionData);
            setMensaje('Devolución procesada exitosamente');
            setEmail('');
            setPrestamoSeleccionado(null);
            setResultadosBusqueda([]);
        } catch (error) {
            console.error('Error al procesar devolución:', error);
            setMensaje('Error al procesar la devolución. Inténtalo de nuevo.');
        } finally {
            setCargandoDevolucion(false);
        }
    };

    // Formatear fecha para mostrar
    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    return (
        <>
            <HeaderAdmin />
            <div className="devolucion-container">
                <h1 className="titulo-principal">Devolución</h1>
                <div className="devolucion-form">
                    <div className="seccion-superior">
                        <div className="grupo-email">
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-email"
                                onKeyDown={(e) => e.key === 'Enter' && handleBuscarPrestamos()}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleBuscarPrestamos}
                            className="boton-buscar"
                            disabled={cargandoBusqueda}
                        >
                            {cargandoBusqueda ? 'Buscando...' : 'Buscar'}
                        </button>
                        <button
                            type="button"
                            onClick={handleDevolucion}
                            className="boton-devolucion"
                            disabled={cargandoDevolucion || !email.trim() || !prestamoSeleccionado}
                        >
                            {cargandoDevolucion ? 'Procesando...' : 'Devolución'}
                        </button>
                    </div>

                    {/* Resultados de búsqueda */}
                    {resultadosBusqueda.length > 0 && (
                        <div className="lista-resultados">
                            {resultadosBusqueda.map((prestamo, index) => (
                                <div key={prestamo.id || index} className="item-resultado">
                                    <input
                                        type="radio"
                                        name="prestamoSeleccionado"
                                        value={prestamo.id}
                                        checked={prestamoSeleccionado?.id === prestamo.id}
                                        onChange={() => setPrestamoSeleccionado(prestamo)}
                                        className="radio-resultado"
                                    />
                                    <span className="texto-resultado">
                                        {prestamo.title || 'Título no disponible'}, {prestamo.author || 'Autor no disponible'} ({prestamo.type || 'Tipo no disponible'}) [Copia {prestamo.id || 'N/A'}] ({formatearFecha(prestamo.dateBooking)} -{formatearFecha(prestamo.dateReturn)})
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Mensajes */}
                {mensaje && (
                    <div className={`mensaje ${
                        mensaje.toLowerCase().includes('error') ? 'mensaje-error' :
                        mensaje.toLowerCase().includes('exitosamente') || mensaje.toLowerCase().includes('procesada') ? 'mensaje-exito' : 'mensaje-info'
                    }`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </>
    );
};

export default Devolucion;