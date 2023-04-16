import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './components/Test';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/test' element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;