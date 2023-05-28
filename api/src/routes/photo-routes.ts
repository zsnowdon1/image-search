import express from 'express';
import { upload } from '../controllers/photo-controller.js';
import { uploadPhoto, getPhotosByUser, addUserToPhoto, getPhoto, deletePhotoById } from '../controllers/photo-controller.js';

const router = express.Router();


router.post('/', upload.single('image'), uploadPhoto);
router.get('/', getPhoto);
router.get('/user', getPhotosByUser);
router.post('/user', addUserToPhoto);
router.delete('/', deletePhotoById)

export default router;