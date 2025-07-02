import React from 'react';
import './DevCard.css';

const DevCard = ({
    name,
    career,
    location,
    image,
    githubUrl
}) => {
    return (
        <div className="dev-card">
            <img src={image} alt={name} className="dev-image" />
            <h1>{name}</h1>

            <div className="icon-text">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
                <p>{career}</p>
            </div>

            <div className="icon-text">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p>{location}</p>
            </div>

            <br />

            <a href={githubUrl} className="repo-link" target="_blank" rel="noopener noreferrer">
                Repositorio Github
            </a>
        </div>
    );
};

export default DevCard;