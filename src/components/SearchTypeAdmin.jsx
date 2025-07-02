import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

const SearchTypeAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        // Validar que haya un término de búsqueda
        if (!searchTerm.trim()) {
            alert('Por favor ingresa un tipo de libro para buscar');
            return;
        }

        // Navegar a la página de resultados con el término de búsqueda en la URL
        navigate(`/admin/search?q=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Busca libros por tipo..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    Buscar
                </button>
            </form>
        </div>
    )
}

export default SearchTypeAdmin;