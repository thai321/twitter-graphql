import User from '../../models/User';

export default {
  // signup: (_, { fullName, username, password, email, avatar }) => {
  signup: async (_, { fullName, ...rest }) => {
    // "Thai Nguyen Truong" ==> firstName = "Thai", lastname = "Nguyen Truong"
    const [firstName, ...lastName] = fullName.split(' ');

    const user = await User.create({ firstName, lastName, ...rest });

    return {
      token: user.createToken()
    };
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
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not exist!');
    }

    if (!user.authenticateUser(password)) {
      throw new Error('Password not match!!');
    }

    return user;
  }
};
