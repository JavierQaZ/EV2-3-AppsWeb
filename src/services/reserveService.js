import { API_URL } from "../config/config";

export const reserveService = {
    // GET - Buscar copia por título
    findCopyByTitle: async (title) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/book/copy/${encodeURIComponent(title)}`, {
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
            console.error('Error encontrando copia:', error);
            throw error;
        }
    },
    // POST - Crear reserva / préstamo
    createReserve: async (bookingData) => {
        try {
            const token = localStorage.getItem('authToken');

            // Formatear datos según el formato esperado por la API
            const formattedData = {
                copybookFk: bookingData.copybookId,
                userFk: bookingData.userEmail
            };

            const response = await fetch(`${API_URL}/booking/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return '';
        } catch (error) {
            console.error('Error creando reserva:', error);
            throw error;
        }
    }
}

export default reserveService;