const https = require('https');
var Twit = require('twit');

setTimeout(function(){

  //console.log('pinged');  
}, 1000 * 60 * 5);

console.log('up');
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});
//"939091";
const joe_id = "939091"

const stream = T.stream('statuses/filter',  { follow: joe_id})

stream.on('tweet', function (tweet) {
  //CHECK based on object


  if(tweet.user.id_str !== joe_id) {
    console.log('not joe');
    return ;
  }
  if(tweet.in_reply_to_status_id) {
    console.log('blocked reply');
    return;

  }
  if(tweet.retweeted_status) {
	console.log("retweet")	  
    	return;
  }
  var text = (tweet.truncated) ? tweet.extended_tweet.full_text : tweet.text;
  console.log(text);
  var t_exploded = text.split(" ");
  //MANUAL RETWEETS
  if(t_exploded[0] === "RT") {
    return;
  }
  if(t_exploded[0].indexOf('"@') > -1) {
    return;
  }
  let newTweet = "Listen Jack! "+text; 
  if (newTweet.length > 280) {
    return;
  }
  
  T.post('statuses/update', { status: newTweet }, function(err, data, response) {
    console.log(data)
  });
  
  if(process.env.test_string) {
	  https.get(process.env.test_string + encodeURIComponent(tweetString));
  }


});
