import { Router } from "express";
import {createUser, GetAllUsers, updateUser, deleteUser} from "../controllers/userController";

const router = Router();

router.get('/', GetAllUsers);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;