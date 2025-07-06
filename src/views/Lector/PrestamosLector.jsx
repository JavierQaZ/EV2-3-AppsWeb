import React, { useState, useEffect } from "react";
import HeaderLector from '../../components/HeaderLector';
import SearchTypeLector from '../../components/SearchTypeLector';
import { lectorService } from '../../services/lectorService';
import './PrestamosLector.css';

const PrestamosLector = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getImageSrc = (base64String) => {
        if (!base64String) {
            return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }

        try {
            if (base64String.startsWith('data:image')) {
                return base64String;
            }
            return `data:image/jpeg;base64,${base64String}`;
        } catch (error) {
            console.error('Error al procesar la imagen base64:', error);
            return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }
    };

    const fetchPrestamos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                setError('No se encontró el email del usuario');
                return;
            }

            const data = await lectorService.findReturnByEmail(userEmail);
            setPrestamos(data);
        } catch (err) {
            setError('Error al cargar los préstamos');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrestamos();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    const getEstado = (state) => {
        return state ? 'Activo' : 'Devuelto';
    };

    return (
        <>
            <HeaderLector/>
            <SearchTypeLector/>
            <div className="prestamos-container">
                <h2 className="prestamos-title">Mis Préstamos</h2>
                {loading && <div className="loading">Cargando préstamos...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && prestamos.length === 0 && (
                    <div className="no-results">No tienes préstamos registrados</div>
                )}

                {!loading && !error && prestamos.length > 0 && (
                    <div className="prestamos-table-container">
                        <table className="prestamos-table">
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Tipo</th>
                                    <th>Estado</th>
                                    <th>Fecha Préstamo</th>
                                    <th>Fecha Devolución</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prestamos.map((prestamo) => (
                                    <tr key={prestamo.id}>
                                        <td>
                                            <div className="book-image-cell">
                                                <img
                                                    src={getImageSrc(prestamo.image64)}
                                                    alt={prestamo.title}
                                                    onError={(e) => {
                                                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="title-cell">{prestamo.title}</td>
                                        <td>{prestamo.author}</td>
                                        <td>{prestamo.type}</td>
                                        <td>
                                            <span className={`estado-badge ${prestamo.state ? 'activo' : 'devuelto'}`}>
                                                {getEstado(prestamo.state)}
                                            </span>
                                        </td>
                                        <td>{formatDate(prestamo.dateBooking)}</td>
                                        <td>{formatDate(prestamo.dateReturn)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default PrestamosLector;