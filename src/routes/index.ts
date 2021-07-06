import { Router } from 'express';
import passport from 'passport';
import { signUp, logInSuccess, logOut } from './Users';


// User-route
const userRouter = Router();
userRouter.post('/signup', signUp);
userRouter.post('/login', passport.authenticate('local'),logInSuccess);
userRouter.post('/logout', logOut);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/accounts', userRouter);
export default baseRouter;
