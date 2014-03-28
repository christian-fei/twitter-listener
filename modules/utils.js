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
  var m = m || 9; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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


/*
  finally
*/

function createAuthString(params){
  var authString = 'OAuth ';
  authString += concatProperties(params, ", ", true);

  return authString;
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
  createAuthString: createAuthString,
};