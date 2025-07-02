import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import logoRojoMuniTalca from '../assets/logoRojoMuniTalca.png';
import { authService } from '../services/authService';

const LoginForm = () => {
    const navigate = useNavigate();
    
    // Estados para el formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    // Estados para manejo de errores y carga
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Función para decodificar JWT
    const decodeJWT = (token) => {
        try {
            // Dividir el token en sus partes (header.payload.signature)
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Token JWT inválido');
            }
            
            // Decodificar el payload (segunda parte)
            const payload = parts[1];
            
            // Añadir padding si es necesario para base64
            const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
            
            // Decodificar base64 y parsear JSON
            const decodedPayload = JSON.parse(atob(paddedPayload));
            
            return decodedPayload;
        } catch (error) {
            console.error('Error decodificando JWT:', error);
            throw new Error('Token inválido');
        }
    };

    // Función para determinar la ruta según el rol
    const getRouteByRole = (rol) => {
        switch (rol) {
            case 'LECTOR':
                return '/lector/home';
            case 'ADMIN':
                return '/admin/home';
            default:
                throw new Error(`Rol no reconocido: ${rol}`);
        }
    };

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error específico cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Limpiar error general
        if (submitError) {
            setSubmitError('');
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }

        // Validar contraseña
        if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setSubmitError('');

        try {
            const response = await authService.loginAuth(formData);
            
            // Debug: Mostrar información de la respuesta
            console.log('Respuesta completa:', response);
            console.log('Tipo de respuesta:', typeof response);
            
            // El token puede venir en diferentes formatos según authService.js
            let token;
            if (typeof response === 'string') {
                // Si la respuesta es directamente el token
                token = response.trim();
                console.log('Token extraído como string:', token);
            } else if (response && typeof response === 'object') {
                if (response.token) {
                    // Si el token está en response.token
                    token = response.token.trim();
                    console.log('Token extraído de response.token:', token);
                } else if (response.message && response.message.startsWith('eyJ')) {
                    // Si el token está en response.message (caso de authService.js con texto plano)
                    token = response.message.trim();
                    console.log('Token extraído de response.message:', token);
                } else if (response.data) {
                    // Si el token está en response.data
                    if (typeof response.data === 'string') {
                        token = response.data.trim();
                        console.log('Token extraído de response.data:', token);
                    } else if (response.data.token) {
                        token = response.data.token.trim();
                        console.log('Token extraído de response.data.token:', token);
                    }
                }
            }
            
            if (!token) {
                console.error('No se pudo extraer el token. Estructura de respuesta:', response);
                throw new Error('No se recibió token de autenticación');
            }

            // Verificar que el token no esté vacío y tenga formato JWT
            if (!token || token === '' || !token.startsWith('eyJ')) {
                console.error('Token inválido o vacío:', token);
                throw new Error('Token de autenticación inválido');
            }
            
            console.log('Token final para decodificar:', token);

            // Decodificar el JWT para obtener los datos del usuario
            const decodedToken = decodeJWT(token);
            
            // Verificar que el token tiene la información necesaria
            if (!decodedToken.rol) {
                throw new Error('Token no contiene información de rol');
            }

            // Guardar token y datos del usuario en localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', decodedToken.rol);
            localStorage.setItem('userEmail', decodedToken.sub);
            
            // Guardar datos adicionales si vienen en la respuesta (solo si response es objeto)
            if (typeof response === 'object' && response.user) {
                localStorage.setItem('userData', JSON.stringify(response.user));
            }
            
            // Guardar también los datos decodificados del token
            localStorage.setItem('tokenData', JSON.stringify(decodedToken));
            
            // Mostrar mensaje de éxito si hay uno
            if (typeof response === 'object' && response.message) {
                console.log('Login exitoso:', response.message);
            }
            
            // Determinar ruta según el rol y redirigir
            const redirectRoute = getRouteByRole(decodedToken.rol);
            navigate(redirectRoute);
            
        } catch (error) {
            console.error('Error en login:', error);
            setSubmitError(error.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
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
                    <h2 className="login-title">Iniciar Sesión</h2>
                </div>
                <hr className="title-line" />
                
                {/* Error general */}
                {submitError && (
                    <div className="error-message" style={{
                        color: '#dc3545',
                        backgroundColor: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        fontSize: '14px'
                    }}>
                        {submitError}
                    </div>
                )}
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email ? 'error' : ''}`}
                            placeholder="ejemplo@ejemplo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <span className="error-text" style={{
                                color: '#dc3545',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block'
                            }}>
                                {errors.email}
                            </span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${errors.password ? 'error' : ''}`}
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <span className="error-text" style={{
                                color: '#dc3545',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block'
                            }}>
                                {errors.password}
                            </span>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                        style={{
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
                
                <br/>
                <hr className="title-line" />
                <div className="register-section">
                    <p className="register-text">¿No tienes cuenta?</p>
                    <button
                        type="button"
                        className="login-button"
                        onClick={handleRegisterClick}
                        disabled={isLoading}
                    >
                        Regístrate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;