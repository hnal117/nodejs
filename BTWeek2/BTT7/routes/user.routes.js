import { Router } from 'express';
import UserController from '../controllers/user.controller';
const router = new Router();

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOneUser);// req.params
router.post('/users', UserController.addUser); // req.body
router.put('/users/:id', UserController.updateUser); // req.body
router.delete('/users/:id', UserController.deleteUser);

export default router;