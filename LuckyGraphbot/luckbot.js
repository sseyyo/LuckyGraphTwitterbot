var twitterAPI = require('node-twitter-api'); //require is not part of JS. It is built into Node.js to load modules.
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var exec = require('child_process').exec;
var fs = require('fs');

var consumerKey = "zfoDVnoum9X1CkzwgZB2C0I7Y";
var consumerSecret = "r7EoqslxKGpN1Fo3gUXqaoAsDfNpDyqE97TIsKXh7DE74wOQ1J";
var accessToken = "835939771591569409-wGrhWOUGOMMEvJYYXkcQ2ZReBWFHCLI";
var tokenSecret = "XnceIcrcoMqBYZ22vauUAI9jlg3XOTinJu3rQ35Dra5RF";

var myScreenName = "colorofyourword";

var twitter = new twitterAPI({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret});

twitter.getStream("user", {}, accessToken, tokenSecret, onData);

function onData(error, streamEvent) {

    // a few different cases.
    // case 1: if the object is empty, simply return

    if (Object.keys(streamEvent).length === 0) {
        return;
    }

    // "event" key present for favorites and new followers
    else if (streamEvent.hasOwnProperty('event')) {
        var followerHandle = streamEvent['source']['screen_name'];
    }

    // 'direct_message' key indicates this is an incoming direct message
    else if (streamEvent.hasOwnProperty('direct_message')) {
        var sentence;
        var dmText = streamEvent['direct_message']['text'];
        var senderName = streamEvent['direct_message']['sender']['screen_name'];
        if(senderName == myScreenName)
        {
          return;
        }
        // console.log(streamEvent);
        var list=["HMMMMM",
                  "Well.....",
                  "I think....",
                  "Hmm..."
                  ]


        if (streamEvent['direct_message']['text'].endsWith("?")) {

          var num = Math.round(Math.random()*4);
          console.log(num);
          sentence = list[num];
          var cmd = 'processing-java --sketch=`pwd`/luck --run';
          exec(cmd, processing);
        }else if(streamEvent['direct_message']['text'].includes("Thank you")||streamEvent['direct_message']['text'].includes("thank you")||streamEvent['direct_message']['text'].includes("thanks")||streamEvent['direct_message']['text'].includes("Thanks")){
          sentence = "You are always welcome."
        }
        else{
          sentence = "Ask me a question"
        }
        // streaming API sends us our own direct messages! skip if we're
        // the sender.
        if (senderName == myScreenName) {
            return;
        }
        console.log("you got mail");
        // send a response!
        twitter.direct_messages(
            'new',
            {
                "screen_name": senderName,
                "text": sentence
                // "text": "What do you value most in a friendship?"
            },
            accessToken,
            tokenSecret,
            function (err, data, resp) { console.log(error); }
        );

        // write a file with the data
        // fs.writeFileSync("data.json", JSON.stringify({...}))

        // run processing
        // var exec = require('???')



        function processing() {
          var filename = 'luck/output.png';
          var params = {
            encoding: 'base64'
          }
          var b64 = fs.readFileSync(filename, params);

          T.post('media/upload', { media_data: b64 }, uploaded);

          function uploaded(err, data, response) {
                var id = data.media_id_string;
          	  var tweet = {
          	    status: '@' + senderName,
          	    media_ids: [id]
          	  }
                T.post('statuses/update', tweet, tweeted);

              }

          	function tweeted(err, data, response) {
          	  if (err) {
          	  	console.log("Something went wwrong!");
          	  } else {
          	    console.log("It worked!");
          	  }
          	}
            }
          }
    }
