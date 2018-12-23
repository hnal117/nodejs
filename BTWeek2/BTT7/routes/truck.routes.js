import { Router } from 'express';
import TruckController from '../controllers/truck.controller';
const router = new Router();

router.post('/trucks', TruckController.addTruck);

export default router;