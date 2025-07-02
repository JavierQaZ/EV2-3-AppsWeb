import React from "react";
import './BookCard.css'

const BookCard = ({ book }) => {
    const getImageSrc = (base64String) => {
        if (!base64String) {
            return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }

        try {
            // Si ya tiene el formato data:image, lo devolvemos tal como está
            if (base64String.startsWith('data:image')) {
                return base64String;
            }

            // Si es una cadena base64 pura (como la que viene del REST), 
            // agregamos el prefijo data:image
            // Por defecto asumimos JPEG, pero podrías detectar el tipo si es necesario
            return `data:image/jpeg;base64,${base64String}`;

        } catch (error) {
            console.error('Error al procesar la imagen base64:', error);
            return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }
    };

    return (
        <div className="book-card">
            <div className="book-image">
                <img
                    src={getImageSrc(book.image64)}
                    alt={book.title}
                    onError={(e) => {
                        e.target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                    }}
                />
            </div>
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <span className="book-type">{book.type}</span>
            </div>
        </div>
    );
};

export default BookCard;