import { API_URL } from "../config/config";

export const returnService = {
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
    // POST - Crear devolución
    createReturn: async (bookingData) => {
        try {
            const token = localStorage.getItem('authToken');

            // Formatear datos según el formato esperado por la API
            const formattedData = {
                dateReturn: bookingData.fechaDevolucion,
            };

            const response = await fetch(`${API_URL}/booking/return/${bookingData.bookingId}`, {
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
            console.error('Error creating book:', error);
            throw error;
        }
    }
}

export default returnService;