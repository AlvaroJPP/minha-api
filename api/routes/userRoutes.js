import express from 'express';
import { 
    createUserController,
    updateUserController,
    getAllUsersController,
    getUserByIdController,
    deleteUserController
} from '../controllers/userController.js';

const router = express.Router();

router.post('/usuarios', createUserController);
router.put('/usuarios/:id', updateUserController);
router.get('/usuarios', getAllUsersController);
router.get('/usuarios/:id', getUserByIdController);
router.delete('/usuarios/:id', deleteUserController);

export default router;