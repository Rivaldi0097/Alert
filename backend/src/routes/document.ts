import express from 'express';
import * as DocumentController from "../controllers/document";

const router = express.Router();

router.post("/", DocumentController.createDocument);

export default router;