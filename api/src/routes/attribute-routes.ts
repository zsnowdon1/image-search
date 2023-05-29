import express from 'express';
import { getAttributesByUser } from '../controllers/attribute-controller.js';
const router = express.Router();

router.get('/', getAttributesByUser);

export default router;