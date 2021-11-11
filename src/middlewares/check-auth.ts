import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		next();
	} catch (err) {
		throw new BadRequestError('Authorisation Failed!!');
	}
};

export default checkAuth;
