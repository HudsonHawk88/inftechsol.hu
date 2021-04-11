const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const { Pool } = require("pg");
const bodyparser = require("body-parser");
const poolJson = require("./pool.json");
const cors = require("cors");
const users = new Pool(poolJson[0]);
const views = new Pool(poolJson[1]);
const fs = require("fs");
const https = require("https");
const host = process.env.HOST ? process.env.HOST : "92.118.27.50";
const port = 8081;

const { SHA256 } = require("crypto-js");
const server = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/inftechsol.hu/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/inftechsol.hu/cert.pem"),
  },
  app
);

app.use(
  ["/", "/user", "/users", "/login", "/header", "/blog", "/referenciak"],
  (req, res, next) => {
    bodyparser.json();
    res.setHeader("Access-Control-Allow-Origin", "http://192.168.11.67:3000");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    return next();
  }
);
app.options("*", cors());

app.get("/login", (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;
  users.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
    if (!err) {
      if (result.rows[0]) {
        if (result.rows[0].password === password) {
          res.status(200).send(result.rows);
        } else {
          res.status(409).send({ err: "Hibás jelszót adott meg!" });
        }
      } else {
        res
          .status(409)
          .send({ err: "Nincs ilyen email címmel regisztált felhasználó!" });
      }
    } else {
      res.status(500).send({ err: err });
    }
  });
});

app.get("/users", (req, res, next) => {
  let id = req.headers.token;
  if (id) {
    users.query(`SELECT * FROM users WHERE token='${id}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    users.query("SELECT * FROM users", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  }
});

app.post("/users", (req, res) => {
  let data = "";
  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const felvitelObj = JSON.parse(data);
      const token = SHA256(felvitelObj.username + felvitelObj.password);
      users.query(
        `INSERT INTO public.users(token, username, password, vezeteknev, keresztnev, email, created_on, last_login, is_admin) VALUES ('${token}','${
          felvitelObj.username
        }','${felvitelObj.password}', '${felvitelObj.vezeteknev}', '${
          felvitelObj.keresztnev
        }', '${felvitelObj.email}', '${felvitelObj.created_on}', '${
          felvitelObj.last_login
        }', ${false});`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "User sikeresen létrehozva!" });
          } else {
            res
              .status(500)
              .send({ msg: "User hozzáadása sikertelen!", err: err });
          }
        }
      );
    });
});

app.put(`/users`, (req, res) => {
  let data = "";
  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const modositoObj = JSON.parse(data);
      const token = req.headers.token;
      users.query(
        `UPDATE public.users SET
            username = '${modositoObj.username}'::text, password = '${
          modositoObj.password
        }'::text, vezeteknev = '${
          modositoObj.vezeteknev
        }'::text, keresztnev = '${modositoObj.keresztnev}'::text, email = '${
          modositoObj.email
        }'::text, is_admin = '${
          modositoObj.isAdmin ? modositoObj.isAdmin : false
        }'::boolean
            WHERE id = '${token}';`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "User sikeresen módosítva!" });
          } else {
            res
              .status(500)
              .send({ msg: "User módosítása sikertelen!", err: err });
          }
        }
      );
    });
});

app.delete("/users", (req, res) => {
  let id = req.headers.token;
  users.query(`DELETE FROM public.users WHERE token='${id}'`, (err) => {
    if (!err) {
      res.status(200).send({ msg: "User sikeresen törölve!" });
    } else {
      res.status(403).send({ msg: "User törlése sikertelen!", err: err });
    }
  });
});

// PUBLIC HEADER

app.get("/header", (req, res) => {
  views.query(`SELECT * FROM header`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res
        .status(500)
        .send({ msg: "A header-ök lekérdezése sikertelen!", err: err });
    }
  });
});

// PUBLIC BLOG

app.get("/blog", (req, res) => {
  views.query(`SELECT * FROM blog`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res
        .status(500)
        .send({ msg: "A header-ök lekérdezése sikertelen!", err: err });
    }
  });
});

// PUBLIC REFERENCIAK

app.get("/referenciak", (req, res) => {
  views.query(`SELECT * FROM referenciak`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res
        .status(500)
        .send({ msg: "A referenciák lekérdezése sikertelen!", err: err });
    }
  });
});

app.post("/referenciak", (req, res) => {
  let data = "";
  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const felvitelObj = JSON.parse(data);
      const token = uuidv4();
      views.query(
        `INSERT INTO public.referenciak(id, company_name, description) VALUES ('${token}'::text, '${felvitelObj.companyName}'::text, '${felvitelObj.description}'::text);`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "Referencia sikeresen létrehozva!" });
          } else {
            res
              .status(500)
              .send({ msg: "Referencia hozzáadása sikertelen!", err: err });
          }
        }
      );
    });
});

server.listen(port, host);
console.log(`Server running at https://${host}:${port}/`);
