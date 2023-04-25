import React, { useEffect, useState } from 'react';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { Photo } from '../../models/models';
import { getPhotosByUser, uploadPhoto } from '../../services/PhotoService';

export function MainPage() {

    const [userPhotos, setUserPhotos] = useState<Array<Photo>>([]);
    const [addedFile, setAddedFile] = useState();

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

    const handleAddFile = (event: any) => {
        setAddedFile(event.target.files[0]);
    };

    const handleSubmitPhoto = async () => {
        const photo = await uploadPhoto(addedFile);
        setUserPhotos(userPhotos => [...userPhotos, photo.photo]);
    };

    function renderPhotos() {
        return userPhotos.map(photo => {
            return <PhotoCard id={photo.id} bucketUrl={photo.bucketUrl} filename={photo.filename} uploadTime={photo.uploadTime} downloadUrl={photo.downloadUrl}/>
        });
    }

    return (
        <div>
            <div>
                <input type="file" accept="image/*" onChange={handleAddFile}/>
                <button onClick={handleSubmitPhoto}>Add Photo</button>
            </div>
            {renderPhotos()}
        </div>
    );
};
