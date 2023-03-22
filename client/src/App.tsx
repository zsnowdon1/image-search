import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './components/Test';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;