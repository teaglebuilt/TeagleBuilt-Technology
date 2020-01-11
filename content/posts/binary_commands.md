---
path: "/binary_commands_over_tcp"
title: Sending Binary Commands in Python Over TCP/IP
description: Lets write a Python script to send information from a linux server to a device with sockets over a tcp connection.
type: post
image: ../images/tcp.jpg
tags:
  - Python
date: 2018-06-08 07:00:00
---

I have recently started working with a company where its business model is wrapped around IOT devices in the field. I was recently tasked to write a python program that will send commands from a server to a device.

&nbsp;

To send a command, we first must understand and choose what protocol we will use. I will be sending this command using TCP protocol, and building a packet that is encoded and eligible for delivery on behalf of another host.

&nbsp;

Make sure that you have tested the tcp connection between both parties.
Verify that your designated port is open, then test the connection, it is possible that your ip tables / firewall rules could be blocking tcp connections from external hosts. To do this run an Ncat command.

&nbsp;

```
nc -vv address port
```

&nbsp;

```
nc -vlp 9100
```

If all is good, you should receive a message that says the connection is established.

The first step is to create a socket and establish the connection between the two parties.

```
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((dns, 9100))

```

&nbsp;

Once the connection has been established, its time to send a command. To send a packet, you must first encode the command. Most common use case is command.encode(“utf-8”)

&nbsp;

In this case, I am storing the string value in a byte array and concatenating ASCII 27 and ASCII 13 at the beginning and end.

&nbsp;

Now it is ready to be sent as a packet. I am setting the socket to half closed until I receive a response.

&nbsp;

```
packet = bytearray("\x1b" + command + "\x0d")
s.send(packet)
s.shutdown(socket.SHUT_WR)
```

&nbsp;

To retrieve the response, use s.recv() and the size of the packet will be noted in the method.

Upon receiving the message, we parse the packet and now we have a response.

```
result = s.recv(1024)
response = result.split('\0', 1)[0].strip()
```

&nbsp;

This example only shows a script that is used with Ansible to send commands to many devices. In order for the device to receive and respond, it will also need a python script that will accept the connection, receive, parse and respond.


&nbsp;

```python

import socket
import sys
def send_command(dns, command):
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((dns, 9100))
except (socket.error,socket.herror,socket.gaierror) as (errno,

strErr):
    raise Exception("Failed to connect to device" + dns + ": " + 

    strErr)
try:
    packet = bytearray("\x1b" + command + "\x0d")
    s.send(packet)
    s.shutdown(socket.SHUT_WR)
    result = s.recv(1024)
    response = result.split('\0', 1)[0].strip() 
    print(response)
    return response
except (socket.error,socket.herror,socket.gaierror) as (errno,        strErr):
    raise Exception("Failed to communicate with device" +    dns   + 
    ": " + strErr)
finally:
    s.close()
def main():
    dns = sys.argv[1]
    command = sys.argv[2]
    send_command(dns, command)
if __name__ == "__main__":
    main()

```

&nbsp;

Finally, I will run the file and pass in the required args.

&nbsp;

```shell
python name_of_file.py "host" "command"
```