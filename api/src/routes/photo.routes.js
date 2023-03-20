import express from 'express';

import { getPhotos, uploadPhoto } from '../controllers/photo.controller.js';

const router = express.Router();

router.get('/', getPhotos);
router.post('/', uploadPhoto);

export default router;