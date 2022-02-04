const Hashids = require('hashids/cjs')
const hashids = new Hashids("Mysecret");
function decode(id){
    const plain = hashids.decode(id);
        return plain;
  };
  
  function encode(id){
    const encoded = hashids.encode(id);
     return encoded;
  };
  module.exports = {
    decode,encode
  }