import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validation from '../validation/user';
import validate from 'express-validation';

const router = new Router();

router.get('/users', UserController.getAll);
router.get('/users/:id',  validate(validation.getOneUser), UserController.getOneUser);// req.params
router.post('/users', validate(validation.addUser), UserController.addUser); // req.body
router.put('/users/:id', validate(validation.updateUser), UserController.updateUser); // req.body
router.delete('/users/:id', validate(validation.deleteUser), UserController.deleteUser);
router.post('/users/login', UserController.login);
router.put('/users/changepassword/:id', validate(validation.changePassword), UserController.changePassword);

export default router;