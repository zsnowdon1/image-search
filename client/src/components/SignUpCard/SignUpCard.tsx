import React, { useState } from 'react';
import { signUp } from '../../services/AuthService';
import './SignUpCard.css';

export function SignUpCard() {

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: ''
    });

    function handleUsernameChange(e: any) {
        setSignUpData({ ...signUpData, username: e.target.value });
    };

    function handlePasswordChange(e: any) {
        setSignUpData({ ...signUpData, password: e.target.value });
    };

    function handleSignUp(e: any) {
        e.preventDefault();
        signUp(signUpData);
    };

    return (
        <form className="form" onSubmit={handleSignUp}>
            <div className="input-1">
                <label>Username</label>
                <input type="text" onChange={handleUsernameChange}></input>
            </div>
            <div className="input">
                <label>Password</label>
                <input type="text" onChange={handlePasswordChange}></input>
            </div>
            <input type="submit" value="Sign Up"/>
        </form>
    );
};
