import { User } from 'src/db/Auth';
import { Request, Response } from 'express'; 
import { UserDoc } from '@entities/User';
import { sign, verify } from 'jsonwebtoken';
import { jwtSecret } from '@shared/constants';


export function signUp (req: Request, res: Response) {    
    const user = new User(req.body);
    user.save()
        .then(req => {
            res.status(200).send("Created");
        })
        .catch(err => {
            res.status(401).send("Username already in use \n");
        });
}

export function logOut (req: Request, res: Response) {
    req.logout();
    req.session.destroy(() => {});
    res.status(200).send("Logged out");
}

export function logInSuccess (req: Request, res: Response) {
    const user = req.user! as UserDoc;
    const token = sign(user.toJSON(), jwtSecret);    
    return res.json({user, token});
}