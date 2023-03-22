import express from 'express';
import multer from 'multer';
import { uploadPhoto } from '../controllers/photo-controller.js';
const router = express.Router();
const upload = multer({ dest: 'images/' });
router.post('/', upload.single('image'), uploadPhoto);
export default router;
//# sourceMappingURL=photo-routes.js.map