import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './LoginForm.css';
import logoRojoMuniTalca from '../assets/logoRojoMuniTalca.png'
import { API_URL } from "../config/config";

const LoginForm = () => {

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
                <form className="login-form">
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
            </div>
        </div>
    )
}

export default LoginForm;