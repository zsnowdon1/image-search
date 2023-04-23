import React, { useState } from 'react';
import { Photo } from '../../models/models';

export function PhotoCard(photo: Photo) {

    return (
        <div>
            <img src={photo.downloadUrl}/>
        </div>
    );
}
