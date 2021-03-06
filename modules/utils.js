var fs = require("fs"),
    crypto = require("crypto")

encode = function( str ) {
  return encodeURIComponent( str )
    .replace(/!/g,'%21')
    .replace(/'/g,'%27')
    .replace(/\(/g,'%28')
    .replace(/\)/g,'%29')
    .replace(/\*/g,'%2A')
}

rstr = function( m ){
  var m = m || 9; s = '', r = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
  return s;
};

function rconf( file ){
  try{
    var content = fs.readFileSync( file );
    return JSON.parse( content );
  }catch( e ){
    console.log( "failed loading " + file );
    throw new Error("failed loading " + file );
  }
}

function removeQueryString(url){
  return url.split("?")[0].split("#")[0];
}

/*
  return an array in the following format

  [[key,value],[key,value]]
*/
function arrayifyObject(obj){
  var arr = [];
  for(var key in obj){
    var value = obj[key];
    arr.push([encode(key),encode(value)]);
  }
  return arr;
}


/*
  the sorted output of the above function
*/
function sortArrayfiedObject(arr){
  var ret = arr.sort(function(a,b){
    return a[0] > b[0];
  });
  return ret;
}

/*
  i am sorry
*/
function arraySortify(obj){
  return sortArrayfiedObject(arrayifyObject(obj));
}

/*
  concatenated key value pairs with an equals sign and &
*/
function concatProperties(properties, conc, quote){
  if( !conc ){
    conc = "&";
  }
  if( quote ){
    quote = '"';
  }else{
    quote = '';
  }
  var arr = sortArrayfiedObject(arrayifyObject(properties));
  var c = "";
  arr.forEach(function(a){
    c+= a[0] +'='+ quote +  a[1] + quote + conc;
  });
  c = c.replace(new RegExp(conc+'$'),'');
  return c;
}


function concatPropertiesBaseString(method, url, signature){
  url = removeQueryString(url);

  var sbs = method.toUpperCase() + "&";
  sbs += encode( url ) + "&";
  sbs += encode( signature );
  return sbs;
}

function createSigningKey(consumer_secret,oauth_token_secret){
  return encode(consumer_secret) + "&" + encode(oauth_token_secret);
}

function createOauthSignature(key, signatureBaseString){
  return crypto.createHmac("sha1", key).update(signatureBaseString).digest("base64")
}


function getBasicAuthHeader(consumer_key,consumer_secret){
  var b = "Basic " + (new Buffer( consumer_key + ":" + consumer_secret ).toString('base64'));
  return b;
}

/*
  finally
*/

function createAuthHeader(params){
  var authString = 'OAuth ';
  authString += concatProperties(params, ", ", true);

  return authString;
}

function getAuthHeader(oauth_consumer_key, oauth_token, oauth_token_secret, method, url, query){
  var nonce = rstr(32),
      timestamp = parseInt(Date.now()/1000);

  var oauth = {
    oauth_consumer_key: oauth_consumer_key,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_token: oauth_token,
    oauth_version: "1.0"
  }

  //adding query to oauth
  for(var key in query){var value = query[key];oauth[key] = value;}

  var mySignature = concatProperties( oauth );
  var mySignatureBaseString = concatPropertiesBaseString(method, url, mySignature);
  var mySigningKey = createSigningKey( oauth_consumer_key, oauth_token_secret );
  var myOauthSignature = createOauthSignature(mySigningKey,mySignatureBaseString);

  oauth.oauth_signature = myOauthSignature;

  //deleting query
  for(var key in query){var value = query[key];delete oauth[key];}

  var myAuthString = createAuthHeader(oauth, ', ', true);

  return myAuthString;
}


module.exports = {
  encode: encode,
  rconf: rconf,
  rstr: rstr,
  removeQueryString: removeQueryString,
  arrayifyObject: arrayifyObject,
  sortArrayfiedObject: sortArrayfiedObject,
  concatProperties: concatProperties,
  concatPropertiesBaseString: concatPropertiesBaseString,
  createSigningKey: createSigningKey,
  createOauthSignature: createOauthSignature,
  createAuthHeader: createAuthHeader,
  getBasicAuthHeader: getBasicAuthHeader,
  getAuthHeader: getAuthHeader,
};