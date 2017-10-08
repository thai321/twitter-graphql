import Tweet from '../../models/Tweet';

// Give me all the tweets
export default {
  getTweets: () => Tweet.find({})
};
