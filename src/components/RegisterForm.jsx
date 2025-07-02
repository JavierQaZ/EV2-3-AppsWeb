import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import logoRojoMuniTalca from '../assets/logoRojoMuniTalca.png';
import { authService } from '../services/authService';

const RegisterForm = () => {
    const navigate = useNavigate();
    
    // Estados para el formulario
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    // Estados para manejo de errores y carga
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Mapear el name del input al formato esperado por el estado
        const fieldName = name === 'last-name' ? 'lastName' : name;
        
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
        
        // Limpiar error específico cuando el usuario empieza a escribir
        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }));
        }
        
        // Limpiar mensajes generales
        if (submitError) {
            setSubmitError('');
        }
        if (submitSuccess) {
            setSubmitSuccess('');
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }

        // Validar apellido
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'El apellido es requerido';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
        }

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
        setSubmitSuccess('');

        try {
            // Preparar datos para enviar al servidor
            const userData = {
                name: formData.name.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                password: formData.password
            };

            const response = await authService.register(userData);
            
            // Mostrar alerta con el mensaje del servidor
            const serverMessage = response.message || 'Usuario registrado exitosamente';
            alert(serverMessage);
            
            // Mostrar mensaje de éxito en el componente
            setSubmitSuccess(`${serverMessage}. Redirigiendo al login...`);
            
            // Limpiar formulario
            setFormData({
                name: '',
                lastName: '',
                email: '',
                password: ''
            });
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (error) {
            setSubmitError(error.message || 'Error al registrar usuario');
        } finally {
            setIsLoading(false);
        }
    };

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
                
                {/* Mensaje de éxito */}
                {submitSuccess && (
                    <div className="success-message" style={{
                        color: '#155724',
                        backgroundColor: '#d4edda',
                        border: '1px solid #c3e6cb',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        fontSize: '14px'
                    }}>
                        {submitSuccess}
                    </div>
                )}
                
                {/* Mensaje de error */}
                {submitError && (
                    <div className="error-message" style={{
                        color: '#721c24',
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
                        <label className="login-form-label" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name ? 'error' : ''}`}
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.name && (
                            <span className="error-text" style={{
                                color: '#dc3545',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block'
                            }}>
                                {errors.name}
                            </span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label className="login-form-label" htmlFor="last-name">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            className={`form-control ${errors.lastName ? 'error' : ''}`}
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.lastName && (
                            <span className="error-text" style={{
                                color: '#dc3545',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block'
                            }}>
                                {errors.lastName}
                            </span>
                        )}
                    </div>
                    
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
                        {isLoading ? 'Registrando...' : 'Registrar'}
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
                        disabled={isLoading}
                    >
                        Inicia Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;