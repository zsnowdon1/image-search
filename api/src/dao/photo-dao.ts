import { Storage } from '@google-cloud/storage';
import vision from '@google-cloud/vision';
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

export const addPhoto = () => {
    
}