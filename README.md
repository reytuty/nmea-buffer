# NMEA-BUFFER

To send and parse nmea message socket

## NmeaBuffer.getMessageBuffer

params
    header : string

        send 5 chars string indicate method name ou header

    message : string

        string message

return 
    uint 8 bits array to send message

```

const NmeaBuffer = require('nmea-buffer') ;
const client = new net.Socket();

let ip = '168.0.0.1' ;
client.connect(8000, ip, function() {
    console.log('Connected');
    const array2send = NmeaBuffer.getMessageBuffer( "START", "ITS JUST A TEST" ) ;
    //out is: [int8, int8, int8, int8 ... ]
    client.write(array2send) ;
});


``` 

## NmeaBuffer.string2Buffer

params
    header : string

        send 5 chars string indicate method name ou header

    message : string

        string message

return 
    Buffer Object

```
const NmeaBuffer = require('nmea-buffer') ;

let buffer = NmeaBuffer.string2Buffer( "12345", "test,4,5" ) ;
//out is: Buffer object

``` 


## NmeaBuffer.bufferToUint8

params
    buffer : Buffer Object

return 
    uint 8 bits array to send message

```
const Buffer        = require('buffer').Buffer ;
const NmeaBuffer = require('nmea-buffer') ;

let uitArray = NmeaBuffer.bufferToUint8( new Buffer() ) ;
//out is: uint 8 bits array to send message

``` 

## NmeaBuffer.parse

params
    data : string

return 
    object:
        {
            header:string,
            message:string
        }

```
const NmeaBuffer = require('nmea-buffer') ;
const client = new net.Socket();

let ip = '168.0.0.1' ;
client.connect(8000, ip, function() {}) ;

client.on('data', function(data) {
    const ob = NmeaBuffer.parse( data ) ;
    //out object { header, message }
}
``` 
