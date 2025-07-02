import React from "react";
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import logoRojoMuniTalca from '../assets/logoRojoMuniTalca.png'

const RegisterForm = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-container-login">
                    <img
                        src={logoRojoMuniTalca}
                        className="logo-login"
                        alt="Logo Municipalidad de Talca"
                    />
                </div>
                <div className="title-section">
                    <h2 className="login-title">Registro</h2>
                </div>
                <hr className="title-line" />
                <form className="login-form">
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="last-name">Apellido</label>
                        <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="ejemplo@ejemplo.com"
                        />
                    </div>
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="contrasenia">Contraseña</label>
                        <input
                            type="password"
                            id="contrasenia"
                            name="contrasenia"
                            className="form-control"
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Ingresar
                    </button>
                </form>
                <br/>
                <hr className="title-line" />
                <div className="register-section">
                    <p className="register-text">¿Ya tienes cuenta?</p>
                    <button
                        type="button"
                        className="login-button"
                        onClick={handleLoginClick}
                    >
                        Inicia Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;