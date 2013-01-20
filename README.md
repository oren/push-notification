## Push Notification Service
HTTP Service for sending notifications to Apple Push Notification Server (APNS)  
Push to Android is coming soon.

## API
1) Register a mobile phone

    curl -H "Content-type: application/json" -X POST -d '{"user_id" : "1", "app_id" : "mongoose", "token" : "12aoeu", "device_id" : "123"}' 0.0.0.0:3000/register

    =>

    201
    {"user_id" : "1", "app_id" : "mongoose", "token" : "12aoeu", device_id : "123"}

* if a token exist it will update the record instead of insert (upsert in mongo's terminology).  
* error while saving to the DB will return 500

2) Send push notification to a user

    curl -H "Content-type: application/json" -X POST -d '{"user_id" : "1", "app_id" : "mongoose", "message" : "you have 3 missed calls"}'  0.0.0.0:3000/push

    =>

    202
    {"user_id" : 1, "app_id" : "mongoose", "message" : "you have 3 missed calls"}

3) Get server health status

    curl 0.0.0.0:3000/health

    =>

    200
    {"pid":2358,"memory":{"rss":9658368,"heapTotal":6131200,"heapUsed":3390248},"uptime":304.4072011373937}


4) Get server health status.txt

    curl 0.0.0.0:3000/health.txt

    =>

    200
     OK  

* return 500 if health.txt is missing

## Development 

### Setup
    Install node.js - http://nodejs.org/
    Install MongoDB (not needed for unit tests)
    npm install

### Run
    node server.js
    open your browser - http://localhost:3000

### Test
    NODE_ENV=test node server.js           # run the server

    npm test                 # run all tests in test folder
    node test/<whatever.js>  # run individual test

### register and push locally

    curl -H "Content-type: application/json" -X POST -d '{"user_id" : "1", "app_id" : "mongoose", "token" : "<24352534 41341234>", "device_id" : "123"}'  0.0.0.0:3000/register
    curl -H "Content-type: application/json" -X POST -d '{"user_id" : "1", "app_id" : "mongoose", "message" : "you have 3 missed calls"}'  0.0.0.0:3000/push

## Production

### Setup
    Istall mon (process monitoring) - (mkdir /tmp/mon && cd /tmp/mon && curl -L# https://github.com/visionmedia/mon/archive/master.tar.gz | tar zx --strip 1 && make install)
    Istall mongroup (process monitoring) - (mkdir /tmp/mongroup && cd /tmp/mongroup && curl -L# https://github.com/visionmedia/mongroup/archive/master.tar.gz | tar zx --strip 1 && make install)

    npm install --production

### Run

    mongroup start

### mon

[mon](https://github.com/visionmedia/mon) is a process monitor that restart the node progra if it crashes.  
I also configure it to send email if the node program crashed 3 times within 1 minute. Here is bin/start:

    mon -d "node $app/server.js" -p $pids/push.pid -l $logs/push.log --attempts 3 --on-error ./bin/email.

stop the server
  
  killall mon

`./bin/stop` - this command will kill the node process, but mon will restart it, so if you want to shutdown the server, use `killall mon`

## status codes

200 - ok  
201 - created  
202 - accepted  
400 - bad request  
401 - unauthorized  
404 - not found  
405 - method not allowed  
500 - server error  

## Setting up new host


## Deploy

I use [deploy](https://github.com/visionmedia/deploy), a simple shell script for deployment.
Install it on your laptop and run `deploy env dev` to deploy to the dev box.  

to deploy for the first time

    deploy dev setup

any other deploy

    deploy dev

This command will look at deploy.conf, an follow the dev section.  
it will run the post-deploy script (bin/restart.sh) which will restart the app.

## MongoDB

### Replica set

start on each dev hosts:  
    /home/t/bin/mongod --fork --logpath /var/log/mongodb.log --logappend --config /etc/mongodb.conf --replSet push

start on the primary (dev1):  

    rs.initiate()
    rs.add("push2.<domain>.com:27017")
    rs.add("push3.<domain>.com:27017")

check status of replica set

    rs.status()

admin website for replica set - push.<domain>.com:28017/

### reconfigure replica set

### minority of members are down

    cfg = rs.conf()
    // change cfg
    rs.reconfigure(cfg)

### majority of members are down
(assuming only member 0 is alive and we want it to become primary)

    cfg = rs.conf()
    cfg.members = [cfg.members[0]]
    rs.reconfig(cfg, {force : true})

### add host to replica set

    before adding dead host rm -r /data/db/*
