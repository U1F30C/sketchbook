# Using HTTP over raw TCP with netcat

[https://askubuntu.com/questions/443227/sending-a-simple-tcp-message-using-netcat](Netcat)
[https://en.wikipedia.org/wiki/HTTP](HTTP)

## HTTP Client
Create a minimal raw HTTP request file `request.txt`. End of line must be CLRF.

``` http
GET / HTTP/1.1
Host: localhost
User-Agent: Netcat


This is the request body.
```

Use `netcat` to send the request over to the server

``` bash
cat request.txt | nc 127.0.0.1 80
```

Optionally, pipe the output `lynx` to view the HTML response

``` bash
cat request.txt | nc 127.0.0.1 80 | lynx
```
You can try this setup for any HTTP server, but many will require extra or specific headers to work propery.
This was tested using NPM's `htt-server` package as a server.

## HTTP Server
Use netcat to listen to TCP in specific port.

Create a `response.txt` file with the raw HTTP response
``` http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Connection: close


<html>
  <head>
    <title>Response</title>
  </head>
  <body>
    <p>This is a reponse body</p>
  </body>
</html>

```


``` bash
cat response.txt | netcat -l -p 8080
```


You can test by running your client command or direcly entering localhost:8080 on your browser.