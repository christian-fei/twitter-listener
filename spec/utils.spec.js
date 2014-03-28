var utils = require('../modules/utils')

describe('utils', function(){

  it('should generate a 32 characters long string', function(){
    expect( utils.rstr(32).length ).toEqual( 32 )
  })

  //i know, i know
  it('should read the config file', function(){
    expect( utils.rconf('config.json') ).toEqual( jasmine.any(Object) )
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
    //from twitter, not mine, so fuck you
    var params = {
      "status": "Hello Ladies + Gentlemen, a signed OAuth request!",
      "include_entities": "true",
      "oauth_consumer_key": "xvz1evFS4wEEPTGEFPHBog",
      "oauth_nonce": "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
      "oauth_signature_method": "HMAC-SHA1",
      "oauth_timestamp": "1318622958",
      "oauth_token": "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
      "oauth_version": "1.0",
    };

    utils.concatProperties( params );

  })

})