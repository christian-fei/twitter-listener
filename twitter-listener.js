/* modules*/
var https = require('https'),
    colors = require('colors'),
    utils = require('./modules/utils')


console.log( ('\n'+ Array(process.stdout.columns).join('=')  +'\n').rainbow.bold);

/* config */
var config = utils.rconf('config.json');

console.log();