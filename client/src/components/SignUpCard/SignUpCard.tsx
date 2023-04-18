import React, { Dispatch, SetStateAction, useState } from 'react';
import { signUp } from '../../services/AuthService';
import './SignUpCard.css';

export function SignUpCard(props: {setSignIn: Dispatch<SetStateAction<boolean>>}) {

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

    function handleCardChange(e: any) {
        props.setSignIn(true);
    };

    return (
        <form className="card" onSubmit={handleSignUp}>
            <div className="input">
                <label>Username</label>
                <input type="text" onChange={handleUsernameChange}></input>
            </div>
            <div className="input">
                <label>Password</label>
                <input type="text" onChange={handlePasswordChange}></input>
            </div>
            <input type="submit" value="Sign Up"/>
            <button type="button" className="switch-card" onClick={handleCardChange}>Already have an account?</button>
        </form>
    );
};
