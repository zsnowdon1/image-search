import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginCard } from '../../components/LoginCard/LoginCard';
import { SignUpCard } from '../../components/SignUpCard/SignUpCard';
import "./LoginPage.css";


function LoginPage() {

    const [signIn, setSignIn] = useState<boolean>(true);


    return (
        <div className="main">
            {signIn &&
                <LoginCard setSignIn={setSignIn}/>
            }
            {!signIn &&
                <SignUpCard setSignIn={setSignIn}/>
            }
            <label>{signIn}</label>
        </div>
    );
}


export default LoginPage;