var colors = require('colors'),
    request = require('request'),
    utils = require('./modules/utils')

console.log( ('\n'+ Array(process.stdout.columns).join('=')  +'\n').rainbow.bold);
console.log('This process is pid ' + process.pid);
console.log( ('\n'+ Array(process.stdout.columns).join('=')  +'\n').rainbow.bold);

/* config */
var config = utils.rconf('config.json');

var tweetStream = request.post({
  url: config.twitter.api.stream,
  oauth: config.oauth,
  form:{
    "track":"twitter"
    //locations: "-74,40,-73,41"
  }
})

tweetStream
  .pipe(process.stdout)
  .on('reconnect',function(){ console.log('stream is trying to reconnect')})
  .on('error',function(){ console.log('stream errored')})
  .on('end',function(){ console.log('stream ended')})























/**
var myAuthHeader = utils.getAuthHeader(
    config.oauth.consumer_key,
    config.oauth.token,
    config.oauth.token_secret,
    'post',
    config.twitter.api.stream,
    {
        // "track": "renzi"
    }
);


var twAuthHeader = 'OAuth oauth_consumer_key="XQaBf74D5UGQ4j9rX20SXw", oauth_nonce="8d3700001d9270e8ade1363ef682f5d8", oauth_signature="ERCF7JIOEuZvx6vnY0hLO9qMC7c%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1396085888", oauth_token="128166532-4aeOelD2xMRFSudjrENOTFke0IIRWVxup6w2ga1I", oauth_version="1.0"';

var basicAuthHeader = utils.getBasicAuthHeader(config.oauth.consumer_key,config.oauth.consumer_secret);

console.log( myAuthHeader ); 
console.log( twAuthHeader ); 
console.log( basicAuthHeader ); 

request.post({
    "url": "https://api.twitter.com/oauth2/token",
    "headers":{
        "Authorization": basicAuthHeader
    },
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "body": "grant_type=client_credentials",
    "followAllRedirects": true
}, function(e,r,body){
    body = JSON.parse(body);
    console.log(body);
})
/**/
