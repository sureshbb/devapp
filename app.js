const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
var size = require('window-size');
var utils = require('window-size/utils');
const expressip = require('express-ip');
const dns = require('dns');
var os = require("os");

app.use(expressip().getIpInfoMiddleware);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./src/views"));

var dnsAddr=dns.lookup('www.geeksforgeeks.org', 
(err, addresses, family) => {});
var addr1= function(){dns.lookup('www.geeksforgeeks.org',(err,addresses,family)=>{return addresses});}


router.get("/", (req, res) => {
  console.log(req.ipInfo);
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  res.render("index",{height:JSON.stringify(utils.win()), width:JSON.stringify(size.get()),timestamp:Intl.DateTimeFormat().resolvedOptions().timeZone,dnsip:JSON.stringify(dnsAddr),ipaddr:ip,hostname:JSON.stringify(os.hostname()),platform:JSON.stringify(os.platform()),type:JSON.stringify(os.type()),addrdom:JSON.stringify(os.networkInterfaces()),cpus:JSON.stringify(os.cpus())});
});


app.use("/", router);
app.listen(process.env.PORT || 8000);
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

console.log("Running at Port 8000");