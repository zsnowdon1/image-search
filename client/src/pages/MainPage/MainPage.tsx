import React, { useEffect, useState } from 'react';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { Photo } from '../../models/models';
import { getPhotosByUser } from '../../services/PhotoService';

export function MainPage() {

    const [userPhotos, setUserPhotos] = useState<Array<Photo>>([]);

    useEffect(() => {
        getPhotos();
    }, []);

    function getPhotos() {
        const username: string = localStorage.getItem('user')!;
        if(username) {
            getPhotosByUser(username).then((result) => {
                setUserPhotos(result);
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("No user found");
        }
    };

    function renderPhotos() {
        return userPhotos.map(photo => {
            return <PhotoCard id={photo.id} bucketUrl={photo.bucketUrl} filename={photo.filename} uploadTime={photo.uploadTime} downloadUrl={photo.downloadUrl}/>
        });
    }

    return (
        <div>
            {renderPhotos()}
        </div>
    );
};
