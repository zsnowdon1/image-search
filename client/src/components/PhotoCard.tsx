import React, { useState } from 'react';
import { Photo } from '../models/models';

const PhotoCard = (photo: Photo) => {

    const [addedFile, setAddedFile] = useState();

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: ''
    });

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });


    return (
        <div>
            {photo.filename}
        </div>
    );
}

export default PhotoCard;
