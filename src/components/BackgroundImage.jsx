import React, {useState, useEffect} from 'react'
import './BackgroundImage.css'

const BackgroundImage = ({ imageUrl = ""}) => {
    const [dimensionesVentana, setDimensionesVentana] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        const handleResize = () => {
            setDimensionesVentana({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <div className='background-container'>
            <div
                className='color-overlay'
            />
            <div className='image-container'>
                <img
                    src={imageUrl}
                    alt="Background"
                    className='background-image'
                />
            </div>
        </div>
    )
}

export default BackgroundImage;