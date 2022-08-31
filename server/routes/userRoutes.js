import {Router} from 'express'
import { login, signUp } from '../controller/userController.js';

const userRoutes = Router();

userRoutes.route('/login').post(login);
userRoutes.route('/signup').post(signUp)

export default userRoutes