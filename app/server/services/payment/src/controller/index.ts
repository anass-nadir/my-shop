/* eslint-disable no-unused-vars */
import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27'
});
const pay = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { amount, token, customer, cartItems } = req.body;
    // let customerId = '';
    // customer.customerId || (await createCustomer(customer, token.id));

    const charge = await stripe.charges
      .create({
        amount: amount * 100,
        currency: 'usd',
        description: `Payment for ${token.id}`
        // customer: customerId
      })
      .catch(err => {
        throw new Error(err.message);
      });

    if (!charge) throw new Error('charge unsuccessful');

    return res.status(200).json({
      message: `charge of ${amount} usd posted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* const createCustomer = ({ email, name }, token) => {
  const { User } = require('../models');
  return new Promise((resolve, reject) => {
    stripe.customers
      .create({
        email,
        name,
        source: token
      })
      .then((customer) => {
        User.findOneAndUpdate(
          { email: email },
          { customerId: customer.id },
          {
            new: true,
            rawResult: true
          },
          (err) => {
            if (err) reject(err);
            resolve(customer.id);
          }
        );
      })
      .catch((err) => reject(err));
  });
}; */

export { pay };
