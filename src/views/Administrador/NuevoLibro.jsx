import React, { useState } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import bookService from '../../services/bookService';
import './NuevoLibro.css';

const NuevoLibro = () => {
    // Estados para el formulario de nuevo libro
    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: '',
        autor: '',
        tipo: '',
        imagen: ''
    });

    // Estados para el archivo de imagen
    const [nombreArchivo, setNombreArchivo] = useState('');

    // Estados para la búsqueda y nueva copia
    const [busqueda, setBusqueda] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false);

    // Estados para mensajes y loading
    const [mensaje, setMensaje] = useState('');
    const [cargandoCreacion, setCargandoCreacion] = useState(false);
    const [cargandoCopia, setCargandoCopia] = useState(false);

    // Manejar selección de archivo de imagen
    const handleSeleccionarArchivo = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const archivo = e.target.files[0];
            if (archivo) {
                // Validar que sea una imagen
                if (!archivo.type.startsWith('image/')) {
                    setMensaje('Por favor selecciona un archivo de imagen válido');
                    return;
                }
                setNombreArchivo(archivo.name);
                // Convertir a Base64
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    // Remover el prefijo "data:image/...;base64," para obtener solo el contenido Base64
                    const base64Content = base64.split(',')[1];
                    setNuevoLibro(prev => ({
                        ...prev,
                        imagen: base64Content
                    }));
                };
                reader.onerror = () => {
                    setMensaje('Error al leer el archivo');
                };
                reader.readAsDataURL(archivo);
            }
        };
        input.click();
    };

    // Manejar cambios en el formulario de nuevo libro
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoLibro(prev => ({
            ...prev,
            [name]: value
        }));
        // Si cambian manualmente el campo imagen, limpiar el nombre del archivo
        if (name === 'imagen') {
            setNombreArchivo('');
        }
    };

    // Manejar búsqueda de libros
    const handleBuscarLibro = async () => {
        if (!busqueda.trim()) {
            setMensaje('Por favor ingresa un título para buscar');
            return;
        }

        setCargandoBusqueda(true);
        setMensaje('');
        try {
            const resultado = await bookService.findBookByTitle(busqueda);
            // La API devuelve un array de libros
            setResultadosBusqueda(resultado);
            if (resultado.length === 0) {
                setMensaje('No se encontraron libros con ese título');
            }
        } catch (error) {
            console.error('Error al buscar libro:', error);
            setMensaje('Error al buscar el libro. Inténtalo de nuevo.');
            setResultadosBusqueda([]);
        } finally {
            setCargandoBusqueda(false);
        }
    };

    // Crear nuevo libro
    const handleCrearLibro = async (e) => {
        e.preventDefault();
        if (!nuevoLibro.titulo || !nuevoLibro.autor || !nuevoLibro.tipo) {
            setMensaje('Por favor completa todos los campos obligatorios');
            return;
        }

        setCargandoCreacion(true);
        setMensaje('');

        try {
            await bookService.createBook(nuevoLibro);
            setMensaje('Libro creado exitosamente');
            setNuevoLibro({
                titulo: '',
                autor: '',
                tipo: '',
                imagen: ''
            });
            setNombreArchivo('');
        } catch (error) {
            console.error('Error al crear libro:', error);
            setMensaje('Error al crear el libro. Inténtalo de nuevo.');
        } finally {
            setCargandoCreacion(false);
        }
    };

    // Crear nueva copia
    const handleCrearCopia = async () => {
        if (!libroSeleccionado) {
            setMensaje('Por favor selecciona un libro para crear la copia');
            return;
        }

        setCargandoCopia(true);
        setMensaje('');

        try {
            await bookService.createBookCopy({
                bookFk: libroSeleccionado.id,
                state: true // Por defecto el estado es true
            });
            setMensaje('Copia del libro creada exitosamente');
            setLibroSeleccionado(null);
            setResultadosBusqueda([]);
            setBusqueda('');
        } catch (error) {
            console.error('Error al crear copia:', error);
            setMensaje('Error al crear la copia. Inténtalo de nuevo.');
        } finally {
            setCargandoCopia(false);
        }
    };

    return (
        <>
            <HeaderAdmin />
            <div className="nuevo-libro-container">
                <h1 className="titulo-principal">Libro / Copia</h1>
                <div className="contenido-principal">
                    {/* Sección Nuevo Libro */}
                    <div className="seccion-nuevo-libro">
                        <h2 className="titulo-seccion">Nuevo Libro</h2>
                        <form onSubmit={handleCrearLibro}>
                            <div className="formulario-grupo">
                                <input
                                    type="text"
                                    name="titulo"
                                    placeholder="Título"
                                    value={nuevoLibro.titulo}
                                    onChange={handleInputChange}
                                    className="input-campo"
                                />
                            </div>

                            <div className="formulario-grupo">
                                <input
                                    type="text"
                                    name="autor"
                                    placeholder="Autor"
                                    value={nuevoLibro.autor}
                                    onChange={handleInputChange}
                                    className="input-campo"
                                />
                            </div>

                            <div className="formulario-grupo">
                                <select
                                    name="tipo"
                                    value={nuevoLibro.tipo}
                                    onChange={handleInputChange}
                                    className="select-campo"
                                >
                                    <option value="">Seleccionar Tipo</option>
                                    <option value="Educación">Educación</option>
                                    <option value="Novelas">Novelas</option>
                                    <option value="Aventura">Aventura</option>
                                    <option value="Poemas">Poemas</option>
                                </select>
                            </div>

                            <div className="formulario-grupo">
                                <div className="grupo-imagen">
                                    <input
                                        type="text"
                                        name="imagen"
                                        placeholder="Imagen"
                                        value={nombreArchivo || nuevoLibro.imagen}
                                        onChange={handleInputChange}
                                        className="input-imagen"
                                        readOnly={!!nombreArchivo}
                                    />
                                    <button
                                        type="button"
                                        className="boton-examinar"
                                        onClick={handleSeleccionarArchivo}
                                    >
                                        Examinar
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="boton-crear"
                                disabled={cargandoCreacion}
                            >
                                {cargandoCreacion ? 'Creando...' : 'Crear'}
                            </button>
                        </form>
                    </div>

                    {/* Sección Nueva Copia */}
                    <div className="seccion-nueva-copia">
                        <h2 className="titulo-seccion">Nueva Copia</h2>
                        <div className="grupo-busqueda">
                            <input
                                type="text"
                                placeholder="Título"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="input-busqueda"
                                onKeyPress={(e) => e.key === 'Enter' && handleBuscarLibro()}
                            />
                            <button
                                onClick={handleBuscarLibro}
                                className="boton-buscar"
                                disabled={cargandoBusqueda}
                            >
                                {cargandoBusqueda ? 'Buscando...' : 'Buscar'}
                            </button>
                            <button
                                onClick={handleCrearCopia}
                                className="boton-crear-copia"
                                disabled={cargandoCopia || !libroSeleccionado}
                            >
                                {cargandoCopia ? 'Creando...' : 'Crear'}
                            </button>
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
                                            {libro.title}. {libro.author} - {libro.type}
                                            {libro.available ? ' (Disponible)' : ' (No disponible)'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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

export default NuevoLibro;