import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './components/Test';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';
import MainPage from './pages/MainPage.tsx/MainPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/test' element={<Test/>}/>
                <Route path='/photos' element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;