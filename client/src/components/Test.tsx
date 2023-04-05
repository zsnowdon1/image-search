import React, { useState } from 'react';
import { uploadPhoto, getPhotosByUser } from '../services/PhotoService';
import { signUp, signIn } from '../services/AuthService';

function Test() {

    const [addedFile, setAddedFile] = useState();

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: ''
    });

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });

    const handleSubmitPhoto = () => {
        uploadPhoto(addedFile);
    };

    const handleAddFile = (event: any) => {
        setAddedFile(event.target.files[0]);
    };

    const handleSubmitUser = () => {
        signUp(signUpData);
    };

    const handleSubmitLogin = () => {
        signIn(signInData);
    };

    const getPhotos = () => {
        getPhotosByUser('zsnowdon');
    }

    return (
        <div>
            <div>
                <input type="file" accept="image/*" onChange={handleAddFile}/>
                <button onClick={handleSubmitPhoto}>Add Photo</button>
            </div>
            <div>
                <input type="text" name="username" onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}/>
                <input type="text" name="password" onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}/>
                <button onClick={handleSubmitUser}>Add user</button>
            </div>
            <div>
                <input type="text" name="username" onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}/>
                <input type="text" name="password" onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}/>
                <button onClick={handleSubmitLogin}>Login</button>
            </div>
            <div>
                <button onClick={getPhotos}>Get Photos</button>
            </div>
        </div>
    );
}

export default Test;
