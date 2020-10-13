const express = require("express");
const { Pool } = require("pg");
const bodyparser = require("body-parser");
const poolJson = require("./pool.json");
const pool = new Pool(poolJson[0]);
const app = express();
const http = require("http");
const host = "192.168.11.67";
const port = 3001;
const { SHA256 } = require("crypto-js");
app.use(function (req, res, next) {
  express.json();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
  );
  bodyparser.text();
  next();
});

app.get("/", (req, res) => {
  console.log(res);
  res.send([{ username: "TG", nev: "Tóth Gergő" }]);

  // req.body = [{ username: "TG", nev: "Tóth Gergő" }];
  res.status(200);
  res.end();
  // pool.query("SELECT * FROM users", (err, result) => {
  //   if (!err) {
  //     res.send(result.rows);
  //     res.status(200);
  //     res.end();
  //   } else {
  //     res.send(err);
  //     res.status(500);
  //     res.end();
  //   }
  // });
});

app.get("/login", (req, res) => {
  let id = req.query.id;
  pool.query(`SELECT * FROM users WHERE token=${id}`, (err, result) => {
    if (!err) {
      res.send(result.rows);
      res.status(200);
      res.end();
    } else {
      res.send(err);
      res.status(500);
      res.end();
    }
  });
});

app.get("/users", (req, res, next) => {
  let id = req.query.id;
  pool.query(`SELECT * FROM users`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows[0]);
    } else {
      next(err);
    }
  });
});

app.post("/users", (req, res) => {
  let body = [];
  let felvitelObj = {};
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("error", (res, err) => {
      console.log(err, res);
    })
    .on("end", () => {
      let object;
      body = Buffer.concat(body).toString();
      object = JSON.parse(body);
      felvitelObj = object[0];
      let id = SHA256(felvitelObj.username + felvitelObj.password);
      pool.query(
        `INSERT INTO public.users(id, username, password, vezeteknev, keresztnev, avatar) VALUES ('${id}','${felvitelObj.username}','${felvitelObj.password}', '${felvitelObj.vezeteknev}', '${felvitelObj.keresztnev}', '${felvitelObj.avatar}');`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "User sikeresen létrehozva!" });
          } else {
            res.status(500).send({ msg: "User hozzáadása sikertelen!" });
          }
        }
      );
    });
});

app.put(`/users`, (req, res) => {
  let body = [];
  let modositoObj = {};
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      let object;
      body = Buffer.concat(body).toString();
      object = JSON.parse(body);
      modositoObj = object;

      pool.query(
        `UPDATE public.users SET
          username = '${modositoObj.username}'::text, password = '${modositoObj.password}'::text, vezeteknev = '${modositoObj.vezeteknev}'::text, keresztnev = '${modositoObj.keresztnev}'::text, avatar = '${modositoObj.avatar}'::bytea
          WHERE id = '${modositoObj.id}';`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "User sikeresen módosítva!" });
          } else {
            res.status(500).send({ msg: "User módosítása sikertelen!" });
          }
        }
      );
    });
});

app.delete("/users", (req, res) => {
  let id = req.query.id;
  pool.query(`DELETE FROM public.users WHERE id='${id}'`, (err) => {
    if (!err) {
      res.status(200).send({ msg: "User sikeresen törölve!" });
    } else {
      res.status(500).send({ msg: "User törlése sikertelen!" });
    }
  });
});

app.listen(port, host, () =>
  console.log(`Example app listening on ${host} port ${port}!`)
);
