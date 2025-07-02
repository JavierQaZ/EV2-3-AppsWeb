import React from 'react';
import './Header.css';

const HeaderPublic = () => {
    return (
        <header className="header">
            <div className="nav-content">
                <div className="logo-container">
                    <span style={{ color: 'white' }}>Book</span>
                    <span style={{ color: '#e74c3c' }}>Hub</span>
                </div>
                <nav className="navigation">
                    <div className="nav-item">
                        <a href="/" className="nav-link">Inicio</a>
                    </div>
                    <div className="nav-item">
                        <a href="/about" className="nav-link">Nosotros</a>
                    </div>
                    <div className="nav-item">
                        <a href="/login" className="nav-link">Inicia Sesión</a>
                    </div>
                    <div className="nav-item">
                        <a href="/register" className="nav-link">Regístrarse</a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default HeaderPublic;