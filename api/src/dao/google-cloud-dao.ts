import { Storage } from '@google-cloud/storage';
import path from 'path';
import { format } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const googleCloud = new Storage({
    keyFilename: path.join(__dirname, '../../secrets/rising-apricot-380619-075a8b342646.json'),
    projectId: 'rising-apricot-380619'
});

const photoBucket = googleCloud.bucket('zsnowdon_app_bucket');

export const addImageToCloud = (file) => new Promise((resolve, reject) => {
    console.log(file);
    const { originalname, buffer } = file;
  
    const blob = photoBucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('error', (err) => {
        console.log(err);
    });

    blobStream.on('finish', () => {
        const publicUrl = format(
            `https://storage.googleapis.com/${photoBucket.name}/${blob.name}`
        );
        resolve(publicUrl);
    })
    .on('error', () => {
        reject(`Unable to upload image, something went wrong`);
    })
    .end(buffer);
});