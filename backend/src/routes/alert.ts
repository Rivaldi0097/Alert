import express from 'express';
import * as AlertController from "../controllers/alert";

const router = express.Router();

router.get("/", AlertController.getAlerts);

router.post("/", AlertController.createAlert);

export default router;