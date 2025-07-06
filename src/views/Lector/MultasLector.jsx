import React, { useState, useEffect } from "react";
import HeaderLector from '../../components/HeaderLector';
import SearchTypeLector from '../../components/SearchTypeLector';
import { lectorService } from '../../services/lectorService';
import './MultasLector.css';

const MultasLector = () => {
    const [multas, setMultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMultas = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                setError('No se encontró el email del usuario');
                return;
            }

            const data = await lectorService.findFineByEmail(userEmail);
            setMultas(data);
        } catch (err) {
            setError('Error al cargar las multas');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMultas();
    }, []);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(amount);
    };

    const getEstado = (state) => {
        return state ? 'Pendiente' : 'Pagada';
    };

    return (
        <>
            <HeaderLector/>
            <SearchTypeLector/>
            <div className="multas-container">
                <h2 className="multas-title">Mis Multas</h2>
                {loading && <div className="loading">Cargando multas...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && multas.length === 0 && (
                    <div className="no-results">No tienes multas registradas</div>
                )}

                {!loading && !error && multas.length > 0 && (
                    <div className="multas-table-container">
                        <table className="multas-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Descripción</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {multas.map((multa) => (
                                    <tr key={multa.id}>
                                        <td className="id-cell">#{multa.id}</td>
                                        <td className="description-cell">{multa.description}</td>
                                        <td className="amount-cell">{formatAmount(multa.amount)}</td>
                                        <td>
                                            <span className={`estado-badge ${multa.state ? 'pendiente' : 'pagada'}`}>
                                                {getEstado(multa.state)}
                                            </span>
                                        </td>
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

export default MultasLector;