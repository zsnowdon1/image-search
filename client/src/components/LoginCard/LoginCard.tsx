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
        e.preventDefault();
        signIn(loginData);
    };

    function handleCardChange(e: any) {
        props.setSignIn(false);
    }

    return (
        <form className="card" onSubmit={handleLogin}>
            <div className="input">
                <label>Username</label>
                <input type="text" onChange={handleUsernameChange}></input>
            </div>
            <div className="input">
                <label>Password</label>
                <input type="text" onChange={handlePasswordChange}></input>
            </div>
            <input type="submit" value="Login"/>
            <button type="button" className="switch-card" onClick={handleCardChange}>Create Account</button>
        </form>
    );
};
