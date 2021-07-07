import { Request, Response, Router } from 'express';
import passport from 'passport';
import { isNewTodoDoc, isTodoDoc } from 'src/validators/Todo';
import { fetchAll, pushTodo, updateTodo } from './Todo';
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
todoRouter.get('/', fetchAll);
todoRouter.post('/', isNewTodoDoc, pushTodo);
todoRouter.put('/', isTodoDoc, updateTodo);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/todos', passport.authenticate('jwt', { session: false }), todoRouter);
baseRouter.use('/accounts', userRouter);
export default baseRouter;
