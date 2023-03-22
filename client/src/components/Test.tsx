import React, { useState } from 'react';
import { uploadPhoto } from '../services/PhotoService';

function Test() {

    const [addedFile, setAddedFile] = useState();

    const handleSubmit = () => {
        uploadPhoto(addedFile);
    }

    const handleAddFile = (event: any) => {
        console.log(event.target.files[0]);
        setAddedFile(event.target.files[0]);
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleAddFile}/>
            <button onClick={handleSubmit}>Add Photo</button>
        </div>
    );
}

export default Test;
