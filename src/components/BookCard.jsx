import React from "react";
import './BookCard.css'

const BookCard = ({ book }) => {
    const getImageSrc = (encodedBase64String) => {
        if (!encodedBase64String) {
            return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }

        try {
            const decodedString = atob(encodedBase64String);

            if (decodedString.startsWith('data:image')) {
                return decodedString;
            }

            return `data:image/jpeg;base64,${decodedString}`;

        } catch (error) {
            console.error('Error al decodificar la imagen base64:', error);
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