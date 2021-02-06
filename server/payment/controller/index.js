const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pay = async (req, res) => {
  try {
    const { amount, token, customer, cartItems } = req.body;
    let customerId = '';
    // customer.customerId || (await createCustomer(customer, token.id));

    const charge = await stripe.charges
      .create({
        amount: amount * 100,
        currency: 'usd',
        description: `Payment for ${token.id}`
        // customer: customerId
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    if (!charge) throw new Error('charge unsuccessful');

    res.status(200).json({
      success: true,
      message: `charge of ${amount} usd posted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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

module.exports = {
  pay
};
