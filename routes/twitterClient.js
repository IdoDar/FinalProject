
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.API_KEY_TWITTER,
  appSecret: process.env.API_SECRET_TWITTER,
  accessToken: process.env.ACCESS_TOKEN_TWITTER,
  accessSecret: process.env.ACCESS_SECRET_TWITTER,
});

//const bearer = new TwitterApi(process.env.BEARER_TOKEN_TWITTER);

const twitterClient = client.readWrite;
//const twitterBearer = bearer.readOnly;

module.exports = { twitterClient };