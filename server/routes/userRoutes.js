import {Router} from 'express'

const userRoutes = Router();

userRoutes.route('/login').post()

export default userRoutes