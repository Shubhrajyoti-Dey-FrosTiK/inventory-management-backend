import { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import express from 'express'
import checkAuth from '../middlewares/check-auth';

const router=express.Router();

const signUp = async (req: Request, res: Response) => {
	const { name, mobile, password } = req.body;
	const existingUser = await User.findOne({ mobile: mobile });
	if (existingUser) {
		throw new BadRequestError('Mobile Number in use');
	}
	const user = User.build({
		name,
		mobile,
		password
	});
	await user.save();
	console.log(user);

	res.status(201).send({ userId: user.id, mobile: user.mobile });
};

const logIn = async (req: Request, res: Response) => {
	const { mobile, password } = req.body;
	const existingUser = await User.findOne({ mobile: mobile });
	
	if (!existingUser) {
		// throw new BadRequestError('Incorrect Credentials');
		res.status(400).send({errors : [{message:'Incorrect Credentials'}]});
	}
	const passwordMatch = existingUser!.password === password;
	console.log('existingUser',existingUser);
	if (!passwordMatch) {
		// throw new BadRequestError('Incorrect Credentials');
		res.status(400).send({errors : [{message:'Incorrect Credentials'}]});
	}
	console.log(existingUser!.name, ' logging in');
	res.status(200).send({
		userId: existingUser!.id,
		mobile: existingUser!.mobile,
	});
};

router.use(checkAuth);
router.post("/signup", signUp);
router.post("/login", logIn);

export default router;
