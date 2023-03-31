import React, { useState } from 'react';
import { uploadPhoto } from '../services/PhotoService';

function Test() {

    const [addedFile, setAddedFile] = useState();

    const [signUpData, setSignUpData] = useState({

    });

    const handleSubmitPhoto = () => {
        uploadPhoto(addedFile);
    }

    const handleAddFile = (event: any) => {
        console.log(event.target.files[0]);
        setAddedFile(event.target.files[0]);
    }

    const handleSubmitUser = () => {

    }

    return (
        <div>
            <div>
                <input type="file" accept="image/*" onChange={handleAddFile}/>
                <button onClick={handleSubmitPhoto}>Add Photo</button>
            </div>
            <div>
                <input type="text" name="username" onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}/>
                <input type="password"/>
                <button onClick={handleSubmitUser}>Add user</button>
            </div>
        </div>
    );
}

export default Test;