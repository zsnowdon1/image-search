import express from 'express';
import multer from 'multer';
import { uploadPhoto } from '../controllers/photo-controller.js';
import path from 'path';
import { upload } from '../index.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadPhoto);

export default router;