import React from "react";
import './BookCard.css'

const BookCard = ({ book }) => {
    const getImageSrc = (base64String) => {
        if (!base64String) {
            return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }

        try {
            if (base64String.startsWith('data:image')) {
                return base64String;
            }
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