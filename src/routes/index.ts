import { Request, Response, Router } from 'express';
import passport from 'passport';
import { fetchAll, pushTodo } from './Todo';
import { signUp, logInSuccess, logOut } from './Users';


// User-route
const userRouter = Router();
userRouter.post('/signup', signUp);
userRouter.post('/login', passport.authenticate('local'), logInSuccess);
userRouter.post('/logout', logOut);
userRouter.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req: Request, res: Response) {
        res.send(req.user!);
    }
);

// Todo routes
const todoRouter = Router();
todoRouter.get('/', passport.authenticate('jwt', { session: false }), fetchAll);
todoRouter.post('/', passport.authenticate('jwt', { session: false }), pushTodo);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/', todoRouter);
baseRouter.use('/accounts', userRouter);
export default baseRouter;
