import { API_URL } from "../config/config";

export const publicService = {
    // GET - Obtener todos los libros
    getAllLibros: async () => {
        try {
            const response = await fetch(`${API_URL}/book/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener libros:', error);
            throw new Error(`Error al obtener libros: ${error.message}`);
        }
    },

    // GET - Obtener todos los libros (por tipo)
    getLibroByType: async (search) => {
        try {
            const response = await fetch(`${API_URL}/book/all/${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los libros de tipo:', error);
            throw new Error(`Error al obtener los libros de tipo: ${search}: ${error.message}`);
        }
    },
}

export default publicService;