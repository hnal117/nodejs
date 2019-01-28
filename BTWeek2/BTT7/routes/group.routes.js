import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import validation from '../validation/group';
import validate from 'express-validation';
import authentication from '../middleware/authentication';

const router = new Router();

router.get('/groups', [validate(validation.getAllGroup), authentication.auth], GroupController.getAll);
router.get('/groups/:id', [validate(validation.getOneGroup), authentication.auth], GroupController.getOneGroup);
router.post('/groups', [validate(validation.addGroup), authentication.auth], GroupController.addGroup);
router.put('/groups/:id', [validate(validation.updateGroup), authentication.auth], GroupController.updateGroup);
router.delete('/groups/:id', [validate(validation.deleteGroup), authentication.auth], GroupController.deleteGroup);
router.post('/groups/:id', [validate(validation.addMemberToGroup), authentication.auth], GroupController.addMemberToGroup);
router.delete('/groups/:id/:memberid', [validate(validation.deleteMemberToGroup), authentication.auth], GroupController.deleteMemberToGroup);

export default router;