import React, { Dispatch, SetStateAction, useState } from 'react';
import { signUp } from '../../services/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';
import './SignUpCard.css';

export function SignUpCard(props: {setSignIn: Dispatch<SetStateAction<boolean>>}) {

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    function handleUsernameChange(e: any) {
        setSignUpData({ ...signUpData, username: e.target.value });
    };

    function handlePasswordChange(e: any) {
        setSignUpData({ ...signUpData, password: e.target.value });
    };

    async function handleSignUp(e: any) {
        e.preventDefault();
        const response = await signUp(signUpData).catch(error => {
            console.log(error);
        });
        console.log(response);
        if(response) {
            navigate('/photos');
        }
    };

    function handleCardChange(e: any) {
        props.setSignIn(true);
        e.preventDefault();
    };

    return (
        <form className="card" onSubmit={handleSignUp}>
            <input type="text" placeholder='Username' onChange={handleUsernameChange}></input>
            <input type="text" placeholder='Password' onChange={handlePasswordChange}></input>
            <input type="submit" className="submit" value="Sign Up"/>
            <button type="button" className="switch-card" onClick={handleCardChange}>Already have an account?</button>
        </form>
    );
};
