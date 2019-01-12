import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import validation from '../validation/group';
import validate from 'express-validation';

const router = new Router();

router.get('/groups', validate(validation.getAllGroup), GroupController.getAll);
router.get('/groups/:id', validate(validation.getOneGroup), GroupController.getOneGroup);
router.post('/groups', validate(validation.addGroup), GroupController.addGroup);
router.put('/groups/:id', validate(validation.updateGroup), GroupController.updateGroup);
router.delete('/groups/:id', validate(validation.deleteGroup), GroupController.deleteGroup);
router.post('/groups/:id', validate(validation.addMemberToGroup), GroupController.addMemberToGroup);
router.delete('/groups/:id/:memberid', validate(validation.deleteMemberToGroup), GroupController.deleteMemberToGroup);

export default router;