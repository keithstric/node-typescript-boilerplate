import { Request, Response, NextFunction } from 'express';

/**
 * Route Middleware to redirect to ensure a request is from an authenticated user
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 */
const authReqMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (false) { //todo: Fix this. I think it will be fixed once passport is introduced
		res.status(401).send({message: 'Not Authenticated'});
	}else {
		next();
	}
};

export default authReqMiddleware;
