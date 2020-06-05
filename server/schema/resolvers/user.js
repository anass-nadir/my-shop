const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server");
const createToken = (user, expiresIn) => {
  const { id, name, email } = user;
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, { expiresIn });
};
const userResolvers = {
  Query: {
    user: async (parent, { id }, { models, loggedIn }) => {
      if (!loggedIn) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await models.user.findById({ _id: id }).exec();
      return user;
    }
  },
  Mutation: {
    register: async (parent, { name, email, password }, { models }) => {
      const user = new models.user({ name, email, password });

      return await user
        .save()
        .then(() => {
          if(user.id)
            return true
            else
            return false
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    },
    login: async (parent, { email, password }, { models }) => {
      const user = await models.user.findOne({ email: email }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }
      const passwordsMatch = bcrypt.compareSync(password, user.password);
      if (!passwordsMatch) {
        throw new AuthenticationError("Invalid credentials");
      }
      const token = createToken(user, 24 * 10 * 50);
      return {
        token
      };
    }
  }
};

module.exports = userResolvers;
