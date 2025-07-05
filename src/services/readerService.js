import { API_URL } from "../config/config";

export const readerService = {
    // GET - Buscar lector por email
    findReaderByEmail: async (email) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/reader/find/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error encontrando usuario:', error);
            throw error;
        }
    },
    // GET - Buscar préstamos/reservas por email
    findReturnByEmail: async (email) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/booking/find/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error encontrando reservas:', error);
            throw error;
        }
    },
    // GET - Buscar multas por email
    findFineByEmail: async (email) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/fine/find/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error encontrando multas:', error);
            throw error;
        }
    },
    // PUT - Actualizar estado del lector
    updateStatus: async (email, state) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/reader/state/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ state })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return;
        } catch (error) {
            console.error('Error actualizando estado:', error);
            throw error;
        }
    }
}

export default readerService;