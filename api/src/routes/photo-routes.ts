import express from 'express';
import { upload } from '../controllers/photo-controller.js';
import { uploadPhoto, getPhotosByUser, addUserToPhoto, getPhoto } from '../controllers/photo-controller.js';

const router = express.Router();


router.post('/', upload.single('image'), uploadPhoto);
router.get('/', getPhoto);
router.get('/user', getPhotosByUser);
router.post('/user', addUserToPhoto);

export default router;