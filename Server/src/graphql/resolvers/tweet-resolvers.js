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
      await requireAuth(user);
      return Tweet.find({}).sort({ createdAt: -1 });
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
      return Tweet.create(args);
    } catch (e) {
      throw e;
    }
  },
  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);

      // {new: true} here mean return the new object, not the old
      return Tweet.findByIdAndUpdate(_id, rest, { new: true });
    } catch (e) {
      throw e;
    }
  },
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      await Tweet.findByIdAndRemove(_id);
      return {
        message: 'Delete Success!'
      };
    } catch (e) {
      throw e;
    }
  }
};
