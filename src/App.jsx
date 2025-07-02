import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './views/Público/LoginPage'
import HomePublic from './views/Público/HomePublic'
import Register from './views/Público/Register'
import About from './views/Público/About'
import SearchResultsPublic from './components/SearchResultsPublic'

import HomeLector from './views/Lector/HomeLector'
import SearchResultsLector from './components/SearchResultsLector'

import HomeAdmin from './views/Administrador/HomeAdmin'
import SearchResultsAdmin from './components/SearchResultsAdmin'
import NuevoLibro from './views/Administrador/NuevoLibro'
import Prestamo from './views/Administrador/Préstamo'
import Devolucion from './views/Administrador/Devolucion'
import Lector from './views/Administrador/Lector'

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    {/* Públicas */}
                    <Route path="/" element={<HomePublic/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/search" element={<SearchResultsPublic/>}/>

                    {/* Lector */}
                    <Route path="/lector/home" element={<HomeLector/>}/>
                    <Route path="/lector/prestamos" element={<HomeLector/>}/>
                    <Route path="/lector/multas" element={<HomeLector/>}/>
                    <Route path="/lector/search" element={<SearchResultsLector/>}/>

                    {/* Admin */}
                    <Route path="/admin/home" element={<HomeAdmin/>}/>
                    <Route path="/admin/search" element={<SearchResultsAdmin/>}/>
                    <Route path="/admin/nuevo-libro" element={<NuevoLibro/>}/>
                    <Route path="/admin/prestamo" element={<Prestamo/>}/>
                    <Route path="/admin/devolucion" element={<Devolucion/>}/>
                    <Route path="/admin/lector" element={<Lector/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;