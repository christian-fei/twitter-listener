var utils = require('../modules/utils')



/*
 vars
*/

//from twitter, not mine, so fuck you
var signatureParams = {
  "status": "Hello Ladies + Gentlemen, a signed OAuth request!",
  "include_entities": "true",
  "oauth_consumer_key": "xvz1evFS4wEEPTGEFPHBog",
  "oauth_nonce": "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
  "oauth_signature_method": "HMAC-SHA1",
  "oauth_timestamp": "1318622958",
  "oauth_token": "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
  "oauth_version": "1.0",
};
var consumer_secret = "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw"
var oauth_token_secret = "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE"


var mySignature = utils.createSignature( signatureParams );

var mySignatureBaseString = utils.createSignatureBaseString('post','https://api.twitter.com/1/statuses/update.json', mySignature);

var mySignatureBaseStringWithQueryString = utils.createSignatureBaseString('post','https://api.twitter.com/1/statuses/update.json?search=twitter', mySignature);

var mySigningKey = utils.createSigningKey( consumer_secret, oauth_token_secret );


var validSignature = "include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog&oauth_nonce=kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&oauth_token=370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb&oauth_version=1.0&status=Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21";

var validSignatureBaseString = "POST&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521";

var validSigningKey = "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";








describe('utils', function(){

  it('should generate a 32 characters long string', function(){
    expect( utils.rstr(32).length ).toEqual( 32 )
  })

  //i know, i know
  it('should read the config file', function(){
    expect( utils.rconf('config.json') ).toEqual( jasmine.any(Object) )
  })

  it('should remove the query string', function(){
    expect( utils.removeQueryString('http://google.com?q=test') ).toEqual('http://google.com');
  })

  xit('should arrayify an object', function(){
    var obj = {
      "foo2":"bar",
      "a":"bar",
      "b":"bar",
      "1":"bar",
      "foo1":"bar",
    }
    var arr = [
      ["foo2","bar"],
      ["a","bar"],
      ["b","bar"],
      ["1","bar"],
      ["foo1","bar"],
    ]
    expect( utils.arrayifyObject(obj) ).toEqual( arr )
  })

  it('should sort an arrayified object', function(){
    var obj = {
      "foo2":"bar",
      "a":"bar",
      "b":"bar",
      "1":"bar",
      "foo1":"bar",
    }
    var arr = [
      ["1","bar"],
      ["a","bar"],
      ["b","bar"],
      ["foo1","bar"],
      ["foo2","bar"],
    ]
    expect( utils.sortArrayfiedObject( utils.arrayifyObject(obj) ) ).toEqual( arr )
  })

  it('should create a valid signature', function(){
    expect( mySignature ).toEqual( validSignature );
  })

  it('should create a valid signature base string', function(){
    expect( mySignatureBaseString ).toEqual( validSignatureBaseString );
  })
  it('should create a valid signature base string (with query string now)', function(){
    expect( mySignatureBaseStringWithQueryString ).toEqual( validSignatureBaseString );
  })

  it('should create a valid signing key', function(){
    expect( mySigningKey ).toEqual( validSigningKey );
  });

})