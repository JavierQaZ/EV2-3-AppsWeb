import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const HeaderLector = () => {
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
                        <a href="/lector/home" className="nav-link">Inicio</a>
                    </div>
                    <div className="nav-item">
                        <a href="/lector/prestamos" className="nav-link">Mis Préstamos</a>
                    </div>
                    <div className="nav-item">
                        <a href="/lector/multas" className="nav-link">Mis Multas</a>
                    </div>
                    <div className="nav-item">
                        <a onClick={handleLogout} className="nav-link">Salir</a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default HeaderLector;