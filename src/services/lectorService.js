import { API_URL } from "../config/config";
import returnService from "./returnService";

export const lectorService = {
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
    }
}

export default returnService;