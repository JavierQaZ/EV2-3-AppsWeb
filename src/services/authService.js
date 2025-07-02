import { API_URL } from "../config/config";

export const authService = {
    // POST - Register
    register: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;

                // Intentar obtener mensaje de error del servidor
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        if (errorData.message) {
                            errorMessage = errorData.message;
                        }
                    } else {
                        // Si es texto plano
                        const textError = await response.text();
                        if (textError) {
                            errorMessage = textError;
                        }
                    }
                } catch (e) {
                    // Si no se puede parsear, usar el mensaje por defecto
                    console.error('Error al parsear respuesta de error:', e);
                }

                throw new Error(errorMessage);
            }

            // Manejar respuesta exitosa
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                // Si es JSON
                data = await response.json();
            } else {
                // Si es texto plano
                const textResponse = await response.text();
                data = {
                    message: textResponse,
                    success: true
                };
            }

            return data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw new Error(`Error al registrar usuario: ${error.message}`);
        }
    },

    // POST - Login
    loginAuth: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;

                // Intentar obtener mensaje de error del servidor
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        if (errorData.message) {
                            errorMessage = errorData.message;
                        }
                    } else {
                        // Si es texto plano
                        const textError = await response.text();
                        if (textError) {
                            errorMessage = textError;
                        }
                    }
                } catch (e) {
                    // Si no se puede parsear, usar el mensaje por defecto
                    console.error('Error al parsear respuesta de error:', e);
                }

                throw new Error(errorMessage);
            }

            // Manejar respuesta exitosa
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                // Si es JSON
                data = await response.json();
            } else {
                // Si es texto plano
                const textResponse = await response.text();
                data = {
                    message: textResponse,
                    success: true
                };
            }

            return data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    }
}

export default authService;