import { API_URL } from "../config/config";

export const bookService = {
    // POST - Crear un nuevo libro
    createBook: async (bookData) => {
        try {
            const token = localStorage.getItem('authToken');

            // Formatear datos según el formato esperado por la API
            const formattedData = {
                author: bookData.autor,
                title: bookData.titulo,
                type: bookData.tipo,
                image64: bookData.imagen || ""
            };

            const response = await fetch(`${API_URL}/book/new`, {
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
            console.error('Error creando libro:', error);
            throw error;
        }
    },

    // GET - Buscar libro por título
    findBookByTitle: async (title) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/book/find/${encodeURIComponent(title)}`, {
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
            console.error('Error encontrando libro:', error);
            throw error;
        }
    },

    // POST - Crear nueva copia de libro
    createBookCopy: async (copyData) => {
        try {
            const token = localStorage.getItem('authToken');

            // Formatear datos según el formato esperado por la API
            const formattedData = {
                bookFk: copyData.bookFk,
                state: copyData.state !== undefined ? copyData.state : true
            };

            const response = await fetch(`${API_URL}/book/newcopy`, {
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
            console.error('Error creando copia de libro:', error);
            throw error;
        }
    }
}

export default bookService;