/**
 * NMEA 
 * @author Renato Miawaki
 * @email renato.miawaki@gmail.com 
 */
const Buffer                = require('buffer').Buffer ;
const nmeaCheck             = require('nmea-checksum') ;
const strLen = (len)=>{
    //são 4 espaços para o len
    var digits = len.toString().length;
    var spaces = 4 - digits ;
    var whiteSpaces = "    ".substr(0, spaces ) ;
    return whiteSpaces+len ;
}
const getMessageBuffer = (header, m, forceCheckSum = null )=>{
    //message size + 12 before $
    var len = m.length + 12 ;
    
    var s = strLen(len)+"$"+header+","+m+"*";
    if(!forceCheckSum) {
        forceCheckSum = nmeaCheck.checksum(m);
    }
    s += forceCheckSum ;
    return bufferToUint8( string2Buffer(s) );
}
const string2Buffer = (s)=>{
    var message = [];
    for(item in s){
        message.push(s[item].charCodeAt(0))
    }
    message.push(13) ;
    message.push(10) ;
    return Buffer.from(message); 
}
const bufferToUint8 = (buf)=>{
    return new Uint8Array(buf) ;
}
/**
 * Send just once message 
 * @param {*} data 
 * @param {*} message2Array 
 */
const parse = (data, message2Array = true)=>{
    var m = data.toString() ;
    m = m.split("$") ;
    m.shift() ;
    m = m.join("").split("*") ;
    m.pop() ;
    m = m.join("").split(",") ;
    const header = m.shift() ;
    const message = (message2Array)?m:m.join(",") ;
    return { header, message }
}
module.exports = {
    getMessageBuffer,
    string2Buffer,
    bufferToUint8,
    parse
};