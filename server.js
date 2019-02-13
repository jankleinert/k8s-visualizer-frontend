const http = require("http");
const io = require('socket.io')();
let pods = [];
let services = [];
const hostname = process.env.OPENSHIFT_BACKEND_HOST || process.env.BACKEND_HOST || 'localhost';
const port = process.env.SERVER_PORT || 8000;

const podOptions = {
    host: hostname,
    path: "/getPods",
    method: "GET"
};

const serviceOptions = {
    host: hostname,
    path: "/getServices",
    method: "GET"
};

io.on('connection', (client) => {
    
    // Pods
    var req1 = http.request(podOptions, function (res) {
        var responseString = "";
    
        res.on("data", function (data) {
            responseString += data;
        });
        res.on("end", function () {
            pods = JSON.parse(responseString);
            console.log(pods); 
        });
    });
    req1.end();

    // Services
    var req2 = http.request(serviceOptions, function (res) {
        var responseString = "";
    
        res.on("data", function (data) {
            responseString += data;
        });
        res.on("end", function () {
            services = JSON.parse(responseString);
            console.log(services); 
        });
    });
    req2.end();

    
    client.on('subscribeToPods', (interval) => {
      console.log('client is subscribing to pods with interval ', interval);
      setInterval(() => {
        var req = http.request(podOptions, function (res) {
            var responseString = "";
        
            res.on("data", function (data) {
                responseString += data;
            });
            res.on("end", function () {
                console.log(pods); 
                pods = JSON.parse(responseString);
            });
        });
        req.end();
        client.emit('pods', pods);
      }, interval);
    });

    client.on('subscribeToServices', (interval) => {
        console.log('client is subscribing to services with interval ', interval);
        setInterval(() => {
          var req = http.request(serviceOptions, function (res) {
              var responseString = "";
          
              res.on("data", function (data) {
                  responseString += data;
              });
              res.on("end", function () {
                  console.log(services); 
                  services = JSON.parse(responseString);
              });
          });
          req.end();
          client.emit('services', services);
        }, interval);
      });
  });

io.listen(port);
console.log('listening on port ', port);