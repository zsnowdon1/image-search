import React, { useEffect, useState } from 'react';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { Photo } from '../../models/models';
import { getPhotosByUser, uploadPhoto } from '../../services/PhotoService';

interface photoProps {
    photo: Photo,
    handleDelete: any
}

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

    async function handleAddFile(event: any) {
        setAddedFile(event.target.files[0]);
    };

    async function handleSubmitPhoto() {
        const photo = await uploadPhoto(addedFile);
        setUserPhotos(userPhotos => [...userPhotos, photo.photo]);
    };

    function handleDeletePhoto(id: number) {
        console.log("done");
    }

    function renderPhotos(): any {
        return (
            <div className="photos">
                {userPhotos.map(photo => {
                    return <PhotoCard photo={photo} handleDelete={handleDeletePhoto}/>;
                })}
            </div>
        )
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
