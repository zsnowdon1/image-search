import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginCard } from '../../components/LoginCard/LoginCard';
import { SignUpCard } from '../../components/SignUpCard/SignUpCard';
import "./LoginPage.css";


function LoginPage() {
    return (
        <div className="main">
            <LoginCard/>
            <SignUpCard/>
        </div>
    );
}


export default LoginPage;