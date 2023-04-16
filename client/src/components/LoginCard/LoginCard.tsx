import React, { useState } from 'react';
import { signIn } from '../../services/AuthService';
import './LoginCard.css';

export function LoginCard() {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    function handleUsernameChange(e: any) {
        setLoginData({ ...loginData, username: e.target.value });
    };

    function handlePasswordChange(e: any) {
        setLoginData({ ...loginData, password: e.target.value });
    };

    function handleLogin(e: any) {
        e.preventDefault();
        signIn(loginData);
    };

    return (
        <form className="form" onSubmit={handleLogin}>
            <div className="input-1">
                <label>Username</label>
                <input type="text" onChange={handleUsernameChange}></input>
            </div>
            <div className="input">
                <label>Password</label>
                <input type="text" onChange={handlePasswordChange}></input>
            </div>
            <input type="submit" value="Login"/>
        </form>
    );
};
