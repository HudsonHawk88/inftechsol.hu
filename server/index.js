/* eslint-disable no-eval */
// DEPENDENCIES
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const fs = require("fs");
const http = require('http');
const https = require("https");
require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

// const server = http.createServer(app);
const server = https.createServer(
  {
    key: fs.readFileSync(process.env.KEY_FILE),
    cert: fs.readFileSync(process.env.CERT_FILE),
    ca: fs.readFileSync(process.env.FULL_FILE)
  },
  app
);

// VARIABLES
const routesJson = require("./routes.json");

// SERVICES

const headerService = require("./routes/common/HeaderService/HeaderService");
const authSerice = require("./routes/common/AuthService/AuthService");
const felhasznalokService = require("./routes/views/FelhasznalokService/FelhasznalokService");
const szolgaltatasokService  = require('./routes/views/SzolgaltatasokService/SzolgaltatasokService');
const blogService = require("./routes/views/BlogService/BlogService");
const referenciakService = require("./routes/views/ReferenciakService/ReferenciakService");
const gdprService = require("./routes/views/GdprService/GdprService");
const elerhetosegekService = require("./routes/views/ElerhetosegekService/ElerhetosegekService");
const orszagokService = require("./routes/common/OrszagokService/OrszagokService");
const telepulesekService = require("./routes/common/TelepulesekService/TelepulesekService");
const mailerService = require("./routes/common/MailerService/MailerService");


app.use(express.json());
app.use(cookieParser());
app.use(routesJson.routes, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://192.168.11.64:3000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  return next();
});

app.options("*", cors());

// AUTH
app.use(authSerice);
// USERS
app.use(["/users"], felhasznalokService);
// HEADER
app.use(["/header"], headerService);
// SZOLGALTATASOK
app.use(["/szolgaltatasok"], szolgaltatasokService);
// BLOG
app.use(["/blog"], blogService);
// REFERENCIAK
app.use(["/referenciak"], referenciakService);
// GDPR
app.use(["/gdpr"], gdprService);
// ELERHETOSEGEK
app.use(["/elerhetosegek"], elerhetosegekService);
// ORSZAGOK START
app.use(["/orszagok"], orszagokService);
// TELEPULESEK
app.use(["/telepulesek"], telepulesekService);
// MAIL START
app.use(["/contactmail"], mailerService);

server.listen(port, host);

console.log(`Server running at https://${host}:${port}/`);
