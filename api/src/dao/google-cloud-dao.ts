import { GetSignedUrlResponse, Storage } from '@google-cloud/storage';
import vision from '@google-cloud/vision';
import path from 'path';
import { format } from 'util';
import { fileURLToPath } from 'url';
import { Attribute, Photo } from '../models/models';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const googleCloud = new Storage({
    keyFilename: path.join(__dirname, '../../secrets/rising-apricot-380619-075a8b342646.json'),
    projectId: 'rising-apricot-380619'
});

const photoBucket = googleCloud.bucket('zsnowdon_app_bucket');

export const addImageToCloud = (file) => new Promise<string | string>((resolve, reject) => {
    const { originalname, buffer } = file;
  
    const blob = photoBucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('error', (err) => {
        console.log(err);
    });

    blobStream.on('finish', async () => {
        const publicUrl: string = format(
            `https://storage.googleapis.com/${photoBucket.name}/${blob.name}`
        );
        resolve(publicUrl);
    })
    .on('error', () => {
        reject(`Unable to upload image, something went wrong`);
    })
    .end(buffer);
});

export async function getImageFromCloud(filename: string): Promise<string> {
    const result: GetSignedUrlResponse = await photoBucket.file(filename).getSignedUrl({
        action: 'read',
        expires: new Date(new Date().getTime() + 86400000)
    });
    return result[0];
}

export async function getImageProperties(file: Photo): Promise<Attribute[]> {
    const blob = photoBucket.file(file.filename.replace(/ /g, "_"));
    const client = new vision.ImageAnnotatorClient({
        keyFilename: path.join(__dirname, '../../secrets/rising-apricot-380619-075a8b342646.json')
    });
    let results = await client.labelDetection(
        `gs://${photoBucket.name}/${blob.name}`
    );
    return results[0].labelAnnotations.map((attribute): Attribute => ({
        name: attribute.description,
        score: attribute.score,
        photoId: file.id
    }));
}