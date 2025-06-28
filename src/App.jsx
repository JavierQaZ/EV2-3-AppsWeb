import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import BgImage from './assets/biblioteca-frontis.jpg'
import BackgroundImage from './components/BackgroundImage'
import LoginForm from './components/LoginForm'

function App() {

    const LoginPage = () => {
        return (
            <>
                <BackgroundImage imageUrl={BgImage}/>
                <LoginForm/>
            </>
        )
    }

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<LoginPage/>}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App