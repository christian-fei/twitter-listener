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
  return an array (sorted) in the following format

  [[key,value],[key,value]]
*/
function arrayifyObject(obj){
  var arr = [];
  for(var key in obj){
    var value = obj[key];
    arr.push([key,value]);
  }

  arr.sort(function(a,b){
    return a[0] > b[0];
  });
  return arr;
}

/*
  twitter fucking shit oauth helpers
*/
function createSignature(opt){

}



module.exports = {
  encode: encode,
  rconf: rconf,
  rstr: rstr,
  arrayifyObject: arrayifyObject,
};