import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/AuthService';
import './LoginCard.css';

export function LoginCard(props: {setSignIn: Dispatch<SetStateAction<boolean>>}) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    function handleUsernameChange(e: any) {
        setLoginData({ ...loginData, username: e.target.value });
    };

    function handlePasswordChange(e: any) {
        setLoginData({ ...loginData, password: e.target.value });
    };

    async function handleLogin(e: any) {
        e.preventDefault();
        const response = await signIn(loginData).catch(error => {
            console.log(error);
        });
        if(response) {
            navigate('/photos');
        }
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
