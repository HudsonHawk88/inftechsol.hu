/* eslint-disable no-eval */
// DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const server = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/inftechsol.hu/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/inftechsol.hu/cert.pem"),
  },
  app
);

// VARIABLES

const host = process.env.HOST ? process.env.HOST : "92.118.27.50";
const port = process.env.HOST ? parseInt(process.env.PORT, 10) + 1 : 8081;
const routesJson = require("./routes.json");

// SERVICES

const header = require("./common/Header/HeaderService");
const login = require("./admin/Login/LoginService");
const blog = require("./public/Blog/BlogService");
const referenciak = require("./public/ReferenciakService/ReferenciakService");
const gdpr = require("./public/GDPR/GdprService");
const elerhetosegek = require("./public/ElerhetosegekService/ElerhetosegekService");
const felhasznalok = require("./admin/Felhasznalok/FelhasznalokService");
const orszagok = require("./admin/Orszagok/OrszagokService");
const telepulesek = require("./admin/Telepulesek/TelepulesekService");
const mailer = require("./common/Mail/MailService");

app.use(routesJson.routes, (req, res, next) => {
  express.json();
  res.setHeader("Access-Control-Allow-Origin", "http://192.168.11.64:3000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  return next();
});

app.options("*", cors());

// LOGIN START

login.getLogin(app);

// LOGIN END

// USERS START

felhasznalok.getUsers(app);
felhasznalok.addUser(app);
felhasznalok.editUser(app);
felhasznalok.deleteUser(app);

// USERS END

// PUBLIC HEADER START

header.getHeaders(app);

// PUBLIC HEADER END

// PUBLIC BLOG START

blog.getBlogs(app);

// PUBLIC BLOG END

// PUBLIC REFERENCIAK START

referenciak.getReferenciak(app);
referenciak.addReferencia(app);
referenciak.editReferencia(app);
referenciak.deleteReferencia(app);

// PUBLIC REFERENCIÁK END

// PUBLIC GDPR START

gdpr.getGdpr(app);
gdpr.addGdpr(app);
gdpr.editGdpr(app);
gdpr.deleteGdpr(app);

// PUBLIC GDPR END

// ELÉRHETŐSÉGEK START

elerhetosegek.getElerhetosegek(app);
elerhetosegek.addElerhetoseg(app);
elerhetosegek.editElerhetoseg(app);
elerhetosegek.deleteElerhetoseg(app);

// ELÉRHETŐSÉGEK END

// ORSZAGOK START

orszagok.getOrszagok(app);

// ORSZAGOK END

// TELEPULESEK START

telepulesek.getTelepulesek(app);

// TELEPULESEK END

// MAIL START

mailer.sendContectMail(app);

// MAIL END

server.listen(port, host);

console.log(`Server running at https://${host}:${port}/`);
