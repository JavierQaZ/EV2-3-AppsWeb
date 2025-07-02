import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const HeaderAdmin = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <header className="header">
            <div className="nav-content">
                <div className="logo-container">
                    <span style={{ color: 'white' }}>Book</span>
                    <span style={{ color: '#e74c3c' }}>Hub</span>
                </div>
                <nav className="navigation">
                    <div className="nav-item">
                        <a href="/admin/home" className="nav-link">Inicio</a>
                    </div>
                    <div className="nav-item">
                        <a href="/admin/nuevo-libro" className="nav-link">Nuevo Libro</a>
                    </div>
                    <div className="nav-item">
                        <a href="/admin/prestamo" className="nav-link">Préstamo</a>
                    </div>
                    <div className="nav-item">
                        <a href="/admin/devolucion" className="nav-link">Devolución</a>
                    </div>
                    <div className="nav-item">
                        <a href="/admin/lector" className="nav-link">Lector</a>
                    </div>
                    <div className="nav-item">
                        <a onClick={handleLogout} className="nav-link">Salir</a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default HeaderAdmin;