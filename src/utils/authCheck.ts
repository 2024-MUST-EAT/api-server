import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction ) => {
    if(!req.session.isLoggedIn) {
        res.status(401).json({message: 'Auth Error !'});
        return;
    }
    
    next();
}