import React, { useState } from 'react';
import { Photo } from '../models/models';

const PhotoCard = (photo: Photo) => {

    return (
        <div>
            {photo.filename}
        </div>
    );
}

export default PhotoCard;
