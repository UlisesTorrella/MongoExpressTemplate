import { Router } from 'express';
import passport from 'passport';
import { fetchAll, pushTodo } from './Todo';
import { signUp, logInSuccess, logOut } from './Users';


// User-route
const userRouter = Router();
userRouter.post('/signup', signUp);
userRouter.post('/login', passport.authenticate('local'),logInSuccess);
userRouter.post('/logout', logOut);

// Todo routes

const todoRouter = Router();
todoRouter.get('/', fetchAll);
todoRouter.post('/', pushTodo);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', todoRouter);
baseRouter.use('/accounts', userRouter);
export default baseRouter;
