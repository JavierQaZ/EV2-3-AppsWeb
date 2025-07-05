import React from 'react';
import { Link } from 'react-router-dom';
import DevCard from '../../components/DevCard';
import PhotoJav from '../../assets/javier.jpg'
import PhotoAri from '../../assets/aracely.jpg'
import './About.css';

const About = () => {
    const developers = [
        {
            id: 1,
            name: "Javier Cáceres",
            career: "Ingeniería Civil Informática",
            location: "Talca, Chile",
            image: PhotoJav,
            githubUrl: "https://github.com/JavierQaZ"
        },
        {
            id: 2,
            name: "Aracely Recabarren",
            career: "Ingeniería Civil Informática",
            location: "Cauquenes, Chile",
            image: PhotoAri,
            githubUrl: "https://github.com/BlxckHexrt/"
        }
    ];

    return (
        <div className="about-container">
            <div className="dev-container">
                {developers.map((dev) => (
                    <DevCard
                        key={dev.id}
                        name={dev.name}
                        career={dev.career}
                        location={dev.location}
                        image={dev.image}
                        githubUrl={dev.githubUrl}
                    />
                ))}
            </div>

            <div className="volver-container">
                <Link to="/" className="volver-link">
                    Volver
                </Link>
            </div>
        </div>
    );
};

export default About;