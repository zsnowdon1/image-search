import express from 'express';
import { upload } from '../controllers/photo-controller.js';
import { uploadPhoto } from '../controllers/photo-controller.js';

const router = express.Router();


router.post('/', upload.single('image'), uploadPhoto);

export default router;