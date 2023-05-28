import { Photo } from '../../models/models';
import './PhotoCard.css';

interface photoProps {
    photo: Photo,
    handleDelete: (id: number) => any
};

export function PhotoCard({photo, handleDelete}: photoProps) {

    return (
        <div className="image-card">
            <img className="image" src={photo.downloadUrl}/>
            <div className="details">
                <p>{photo.filename}</p>
                <button className="btn btn-delete" onClick={() => handleDelete(photo.id)}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    );
}
