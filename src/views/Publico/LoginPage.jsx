import React from 'react'
import BgImage from '../../assets/biblioteca-frontis.jpg'
import BackgroundImage from '../../components/BackgroundImage'
import LoginForm from '../../components/LoginForm'

const LoginPage = () => {
    return (
        <>
            <BackgroundImage imageUrl={BgImage}/>
            <LoginForm/>
        </>
    )
}

export default LoginPage;