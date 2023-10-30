import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import App from './chatbot';
function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chatbot" element={<App />}/>
                
            </Routes>

        </Router>


    );
}

export default Rotas;