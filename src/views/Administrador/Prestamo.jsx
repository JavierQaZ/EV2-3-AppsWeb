import React, { useState } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import reserveService from '../../services/reserveService';
import './Prestamo.css';

const Prestamo = () => {
    // Estados para el formulario
    const [email, setEmail] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
    const [cargandoCreacion, setCargandoCreacion] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Manejar búsqueda de libros
    const handleBuscarLibro = async () => {
        if (!busqueda.trim()) {
            setMensaje('Por favor ingresa un título para buscar');
            return;
        }

        setCargandoBusqueda(true);
        setMensaje('');

        try {
            const resultado = await reserveService.findCopyByTitle(busqueda);
            setResultadosBusqueda(resultado);
            if (resultado.length === 0) {
                setMensaje('No se encontraron copias de libros con ese título');
            }
        } catch (error) {
            console.error('Error al buscar libro:', error);
            setMensaje('Error al buscar el libro. Inténtalo de nuevo.');
            setResultadosBusqueda([]);
        } finally {
            setCargandoBusqueda(false);
        }
    };

    // Crear nuevo préstamo
    const handleCrearPrestamo = async () => {
        if (!email.trim()) {
            setMensaje('Por favor ingresa un email');
            return;
        }

        if (!libroSeleccionado) {
            setMensaje('Por favor selecciona un libro para el préstamo');
            return;
        }

        setCargandoCreacion(true);
        setMensaje('');

        try {
            const bookingData = {
                copybookId: libroSeleccionado.id,
                userEmail: email
            };

            await reserveService.createReserve(bookingData);
            setMensaje('Préstamo creado exitosamente');
            setEmail('');
            setLibroSeleccionado(null);
            setResultadosBusqueda([]);
            setBusqueda('');
        } catch (error) {
            console.error('Error al crear préstamo:', error);
            setMensaje('Error al crear el préstamo. Inténtalo de nuevo.');
        } finally {
            setCargandoCreacion(false);
        }
    };

    return (
        <>
            <HeaderAdmin />
            <div className="prestamo-container">
                <h1 className="titulo-principal">Préstamo</h1>
                <div className="prestamo-form">
                    <div className="seccion-superior">
                        <div className="grupo-email">
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-email"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleCrearPrestamo}
                            className="boton-crear-prestamo"
                            disabled={cargandoCreacion || !email.trim() || !libroSeleccionado}
                        >
                            {cargandoCreacion ? 'Creando...' : 'Crear Préstamo'}
                        </button>
                    </div>

                    <div className="seccion-busqueda">
                        <div className="grupo-busqueda">
                            <input
                                type="text"
                                placeholder="Título del Libro"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="input-busqueda"
                                onKeyDown={(e) => e.key === 'Enter' && handleBuscarLibro()}
                            />
                            <button
                                type="button"
                                onClick={handleBuscarLibro}
                                className="boton-buscar"
                                disabled={cargandoBusqueda}
                            >
                                {cargandoBusqueda ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                    </div>

                    {/* Resultados de búsqueda */}
                    {resultadosBusqueda.length > 0 && (
                        <div className="lista-resultados">
                            {resultadosBusqueda.map((libro, index) => (
                                <div key={libro.id || index} className="item-resultado">
                                    <input
                                        type="radio"
                                        name="libroSeleccionado"
                                        value={libro.id}
                                        checked={libroSeleccionado?.id === libro.id}
                                        onChange={() => setLibroSeleccionado(libro)}
                                        className="radio-resultado"
                                    />
                                    <span className="texto-resultado">
                                        {libro.bookEntity.title}, {libro.bookEntity.author} - ({libro.bookEntity.type}) [Copia {libro.id}]
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
                        mensaje.toLowerCase().includes('exitosamente') || mensaje.toLowerCase().includes('creado') ? 'mensaje-exito' : 'mensaje-info'
                    }`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </>
    );
};

export default Prestamo;