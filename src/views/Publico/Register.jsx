import React from 'react'
import BgImage from '../../assets/biblioteca-frontis.jpg'
import BackgroundImage from '../../components/BackgroundImage'
import RegisterForm from '../../components/RegisterForm'

const Register = () => {
    return (
        <>
            <BackgroundImage imageUrl={BgImage}/>
            <RegisterForm/>
        </>
    )
}

export default Register;