import React, { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { signIn } from '../../services/AuthService';
import './LoginCard.css';

export function LoginCard(props: {setSignIn: Dispatch<SetStateAction<boolean>>}) {

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
        signIn(loginData);
        e.preventDefault();
    };

    function handleCardChange(e: any) {
        props.setSignIn(false);
    }

    return (
        <form className="card" onSubmit={handleLogin}>
            <input type="text" placeholder='Username' onChange={handleUsernameChange}></input>
            <input type="text" placeholder='Password' onChange={handlePasswordChange}></input>
            <input type="submit" className="submit" value="Login"/>
            <button type="button" className="switch-card" onClick={handleCardChange}>Don't have an account? Sign up</button>
        </form>
    );
};
