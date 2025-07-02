import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import './BookList.css'
import BookCard from './BookCard'
import publicService from "../services/publicService";
import HeaderPublic from "./HeaderPublic";
import SearchType from "./SearchTypePublic";

const SearchResultsPublic = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';

    useEffect(() => {
        const fetchBooks = async () => {
            if (!searchTerm.trim()) {
                setBooks([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await publicService.getLibroByType(searchTerm);
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [searchTerm]);

    if (loading) {
        return (
            <>
                <HeaderPublic/>
                <SearchType/>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Buscando libros...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <HeaderPublic/>
                <SearchType/>
                <div className="error-container">
                    <p>Error: {error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <HeaderPublic/>
            <SearchType/>
            <div className="library-container">
                <div className="search-header">
                    <h2>Resultados para: "{searchTerm}"</h2>
                    <p>{books.length} libro(s) encontrado(s)</p>
                </div>
                {books.length === 0 ? (
                    <div className="no-results">
                        <p>No se encontraron libros del tipo "{searchTerm}"</p>
                    </div>
                ) : (
                    <div className="books-grid">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchResultsPublic;