import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import PageClient from './components/rolePages/pageClient';
import PageAngajat from './components/rolePages/pageAngajat';
import PageManager from './components/rolePages/pageManager';
import PageAdmin from './components/rolePages/pageAdmin';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/pageClient" element={<PageClient />} />
                <Route path="/pageAngajat" element={<PageAngajat />} />
                <Route path="/pageManager" element={<PageManager />} />
                <Route path="/pageAdmin" element={<PageAdmin />} />
            </Routes>
        </Router>
    );
}

export default App;