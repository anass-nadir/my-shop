import { Request, Response } from 'express';
import { BadRequestError } from '@anass-nadir/my-shop-common';
import User from '../models';
import { generateUserJwt } from '../utils';

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await user.comparePassword(password);

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  const userJwt = await generateUserJwt(user._id);
  req.session = {
    jwt: userJwt
  };
  return res.status(200).json({
    user
  });
};
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const {
    name,
    email,
    phone,
    gender,
    address,
    town,
    country,
    password,
    googleId,
    stripeId
  } = req.body;

  const user = User.build({
    name,
    email,
    phone,
    gender,
    address,
    town,
    country,
    password,
    googleId,
    stripeId
  });

  await user.save();
  const userJwt = await generateUserJwt(user._id);

  req.session = {
    jwt: userJwt
  };
  return res.status(201).json({
    user
  });
};
const logoutUser = (req: Request, res: Response): Response => {
  req.session = null;
  res.clearCookie(process.env.SESSION_NAME!, { path: '/' });
  return res.sendStatus(204);
};
const authenticatedUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.findById(req.currentUser?.key);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  return res.status(200).json({
    user
  });
};
export { loginUser, createUser, logoutUser, authenticatedUser };
