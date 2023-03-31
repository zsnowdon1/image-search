import React, { useState } from 'react';
import { uploadPhoto } from '../services/PhotoService';
import { signUp } from '../services/AuthService';

function Test() {

    const [addedFile, setAddedFile] = useState();

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: ''
    });

    const handleSubmitPhoto = () => {
        uploadPhoto(addedFile);
    }

    const handleAddFile = (event: any) => {
        console.log(event.target.files[0]);
        setAddedFile(event.target.files[0]);
    }

    const handleSubmitUser = () => {
        console.log(signUpData);
        signUp(signUpData);
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
        </div>
    );
}

export default Test;
