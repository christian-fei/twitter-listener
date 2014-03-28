var fs = require("fs");

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
  concatenated key value pairs with an equals sign and &
*/
function createSignature(properties){
  var arr = sortArrayfiedObject(arrayifyObject(properties));
  var c = "";
  arr.forEach(function(a){
    c+= a[0] +'='+ a[1] +'&';
  });
  c = c.replace(/\&$/g,'');
  return c;
}

function createSignatureBaseString(method, url, signature){
  var sbs = method.toUpperCase() + "&";
  sbs += encode( url ) + "&";
  sbs += encode( signature );
  return sbs;
}


module.exports = {
  encode: encode,
  rconf: rconf,
  rstr: rstr,
  arrayifyObject: arrayifyObject,
  sortArrayfiedObject: sortArrayfiedObject,
  createSignature: createSignature,
  createSignatureBaseString: createSignatureBaseString,
};