import { Request, Response } from 'express';
import { signUser, BadRequestError } from '@anass-nadir/my-shop-common';

import User from '../models';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
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
      { expiresIn: 60 * 60 * 24 * 1000 }
    );
    req.session = {
      jwt: userJwt
    };
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    await user.save();

    const userJwt = signUser(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
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
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
const logoutUser = (req: Request, res: Response): Response => {
  try {
    req.session = null;
    res.clearCookie('my-shop-sess', { path: '/' });
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export { login, createUser, logoutUser };
