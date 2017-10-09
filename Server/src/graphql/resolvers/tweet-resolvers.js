import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

// Give me all the tweets
export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.findById(_id);
    } catch (e) {
      throw e;
    }
  },

  getTweets: async (_, args, { user }) => {
    try {
      // await requireAuth(user);
      return Tweet.find({}).sort({ createdAt: -1 });
    } catch (e) {
      throw e;
    }
  },

  getUserTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.find({ user: user._id }).sort({ createdAt: -1 });
    } catch (e) {
      throw e;
    }
  },

  // createTweet: async (_, args, ctx) => {
  createTweet: async (_, args, { user }) => {
    // console.log('====================');
    // console.log('Context', ctx);
    // console.log('====================');
    try {
      await requireAuth(user);
      return Tweet.create({ ...args, user: user._id });
    } catch (e) {
      throw e;
    }
  },
  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);

      const tweet = await Tweet.findOne({ _id, user: user._id });

      if (!tweet) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value;
      });

      return tweet.save;

      // {new: true} here mean return the new object, not the old
      // return Tweet.findByIdAndUpdate(_id, rest, { new: true });
    } catch (e) {
      throw e;
    }
  },
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });

      if (!tweet) {
        throw new Error('Not Found!');
      }

      await tweet.remove();

      // await Tweet.findByIdAndRemove(_id);
      return {
        message: 'Delete Success!'
      };
    } catch (e) {
      throw e;
    }
  }
};
