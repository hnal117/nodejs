import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validation from '../validation/user';
import validate from 'express-validation';
import authentication from '../middleware/authentication';

const router = new Router();

router.get('/users', authentication.auth, UserController.getAll);
router.get('/users/:id', [validate(validation.getOneUser), authentication.auth], UserController.getOneUser);// req.params
router.post('/users', [validate(validation.addUser)], UserController.addUser); // req.body
router.put('/users/:id', [validate(validation.updateUser), authentication.auth], UserController.updateUser); // req.body
router.delete('/users/:id', [validate(validation.deleteUser), authentication.auth], UserController.deleteUser);
router.post('/users/login', UserController.login);
router.put('/users/changepassword/:id', [validate(validation.changePassword), authentication.auth], UserController.changePassword);
router.post('/users/upload', UserController.upload);
router.post('/users/sendmail', UserController.sendMail);
export default router;