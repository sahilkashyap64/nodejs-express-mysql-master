function decode(str){
    const plain = Buffer.from(str, 'base64').toString('utf8') ;
    return plain;
  };
  
  function encode(str){
    const encoded = Buffer.from(str, 'utf8').toString('base64') ;
    return encoded;
  };
  module.exports = {
    decode,encode
  }