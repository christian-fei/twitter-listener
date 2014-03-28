/* modules*/
var https = require('https'),
    colors = require('colors'),
    utils = require('./modules/utils')


console.log( ('\n'+ Array(process.stdout.columns).join('=')  +'\n').rainbow.bold);

/* config */
var config = utils.rconf('config.json');


/*
  Building the header string:
  https://dev.twitter.com/docs/auth/authorizing-request

  each line is a step
*/
var authRequestString = 'OAuth ';

    authRequestString+= 'oauth_consumer_key';
    authRequestString+= '=';
    authRequestString+= '"';
    authRequestString+= utils.encode(config.oauth.consumer_key);
    authRequestString+= '"';
    authRequestString+= ', ';

    authRequestString+= 'oauth_nonce';
    authRequestString+= '=';
    authRequestString+= '"';
    authRequestString+= utils.encode(config.oauth.consumer_key);
    authRequestString+= '"';
    authRequestString+= ', ';
