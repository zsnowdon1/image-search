import express from 'express';
import { upload } from '../controllers/photo-controller.js';
import { uploadPhoto, getPhotosByUser } from '../controllers/photo-controller.js';

const router = express.Router();


router.post('/', upload.single('image'), uploadPhoto);
router.get('/', getPhotosByUser);

export default router;