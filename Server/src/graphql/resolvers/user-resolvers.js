import User from '../../models/User';
import { requireAuth } from '../../services/auth';

export default {
  // signup: (_, { fullName, username, password, email, avatar }) => {
  signup: async (_, { fullName, ...rest }) => {
    // "Thai Nguyen Truong" ==> firstName = "Thai", lastname = "Nguyen Truong"

    try {
      const [firstName, ...lastName] = fullName.split(' ');

      const user = await User.create({ firstName, lastName, ...rest });

      return {
        token: user.createToken()
      };
    } catch (e) {
      throw e;
    }

    // return User.create({
    //   firstName,
    //   lastName,
    //   username,
    //   password,
    //   email,
    //   avatar
    // });
    // return User.create({ firstName, lastName, ...rest });
  },

  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not exist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!!');
      }

      return {
        token: user.createtoken()
      };
    } catch (e) {
      throw e;
    }
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);

      return me;
    } catch (e) {
      throw e;
    }
  }
};
