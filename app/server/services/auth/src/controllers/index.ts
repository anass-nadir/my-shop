import { Request, Response } from 'express';
import { signUser, BadRequestError } from '@anass-nadir/my-shop-common';
import User from '../models';

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

  const userJwt = signUser(
    {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET!,
    { expiresIn: 60 * 60 * 24 * 1000 }
  );
  req.session = {
    jwt: userJwt
  };
  return res.status(200).json({
    success: true,
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

  const userJwt = signUser(
    {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET!,
    { expiresIn: 60 * 60 * 24 * 1000 }
  );
  req.session = {
    jwt: userJwt
  };
  return res.status(201).json({
    success: true,
    user,
    message: 'User created!'
  });
};
const logoutUser = (req: Request, res: Response): Response => {
  req.session = null;
  res.clearCookie(process.env.SESSION_NAME!, { path: '/' });
  return res.status(200).json({
    success: true
  });
};
const authenticatedUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.findById(req.currentUser?._id);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  return res.status(200).json({
    user: user,
    success: true
  });
};
export { loginUser, createUser, logoutUser, authenticatedUser };
