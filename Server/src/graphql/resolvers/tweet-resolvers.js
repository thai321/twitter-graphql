import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

// Give me all the tweets
export default {
  getTweet: (_, { _id }) => Tweet.findById(_id),
  getTweets: () => Tweet.find({}).sort({ createdAt: -1 }),
  // createTweet: async (_, args, ctx) => {
  createTweet: async (_, args, { user }) => {
    // console.log('====================');
    // console.log('Context', ctx);
    // console.log('====================');

    await requireAuth(user);

    return Tweet.create(args);
  },
  updateTweet: (_, { _id, ...rest }) =>
    Tweet.findByIdAndUpdate(_id, rest, { new: true }),
  deleteTweet: async (_, { _id }) => {
    try {
      await Tweet.findByIdAndRemove(_id);
      return {
        message: 'Delete Success!'
      };
    } catch (e) {
      throw e;
    }
  }
};

// {new: true} here mean return the new object, not the old
