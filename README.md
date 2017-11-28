# basic-tcp-chatroom-server

It's a very basic broadcast chatroom server created using `net` module of Node.js.

You can run the script as:

```
node server.js
```

Or you can also run it as a daemon as:


```
nohup node server.js > chatroom_server.log 2>&1 &

```

The server listens on port 8080 so make sure to keep that port open on your server. You may tweak the code in `server.js` to change the port number.

Clients can access the chatroom via command line using the command:


```
nc <ip address> 8080
```

Here is a sample output:

```
Please enter your name to continue
> Mandeep
Welcome Mandeep!
Users currently online: Mandeep
> <Abhi just joined! [11/28 12:2]>
Users currently online: Mandeep, Abhi
> Hi
> Abhi [11/28 12:2]: Hey!
> Abhi [11/28 12:3]: Looks nice :-). How ?
> Node.js. Let me send you the repo link
> https://github.com/mandeepm91/basic-tcp-chatroom-server
> Have fun ;-)
> ^C
```
