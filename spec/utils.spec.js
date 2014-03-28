var utils = require('../modules/utils')

describe('utils', function(){

  it('should generate a 32 characters long string', function(){
    expect( utils.rstr(32).length ).toEqual( 32 )
  })

  //i know, i know
  it('should read the config file', function(){
    expect( utils.rconf('config.json') ).toEqual( jasmine.any(Object) )
  })

  it('should arrayify an object', function(){
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
    expect( utils.arrayifyObject(obj) ).toEqual( arr )
  })

})