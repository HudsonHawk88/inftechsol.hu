const { Pool } = require("pg");
const poolJson = require("./pool.json");
const users = new Pool(poolJson.users);
const router = require('express').Router();
const bcrypt = require('bcrypt');

// USERS START

router.get('/', (req, res) => {
  let { id } = req.headers;
  if (id) {
    users.query(
      `SELECT * FROM users WHERE id='${id}';`,
      (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    users.query("SELECT * FROM users;", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  }
})

router.post('/', (req, res) => {
  const felvitelObj = JSON.parse(JSON.stringify(req.body));
  const sqlUsername = "SELECT username FROM users WHERE username = $1";
  const sqlEmail = "SELECT email FROM users WHERE email = $1";
  const resultUsername = users.query(sqlUsername,[felvitelObj.username]);
  const resultEmail = users.query(sqlEmail, [felvitelObj.email])
  
  //success, user is not there create it 
  if (resultUsername.rowCount === 0 || resultEmail.rowCount === 0) {
    const hash =  bcrypt.hash(felvitelObj.password, 10)
    const sqlInsert = `INSERT INTO users (nev, cim, telefon, username, email, password, roles)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    users.query(
      sqlInsert, [felvitelObj.nev, felvitelObj.cim, felvitelObj.telefon, felvitelObj.username, felvitelObj.email, hash, {}],
      (err) => {
        if (!err) {
          res
            .status(200)
            .send({ msg: "User sikeresen létrehozva!" });
        } else {
          res
            .status(409)
            .send({ err: "User hozzáadása sikertelen!" });
        } 
      } 
    );
  } else {
    res.status(409).send({ err: "Ezzel a felhasználónévvel / email címmel már regisztráltak!" })
  }
})

router.put('/', (req, res) => {
  const modositoObj = JSON.parse(JSON.stringify(req.body));
  const id = req.headers.id;
  const sql = `UPDATE users SET nev='${modositoObj.nev}', cim='${modositoObj.cim}', telefon='${modositoObj.telefon}', username='${modositoObj.username}', email='${modositoObj.email}', password='${modositoObj.password}', roles='${modositoObj.roles}') WHERE id='${id}';`;
  users.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "User sikeresen módosítva!" });
    } else {
      res.status(500).send({ err: "User módosítása sikertelen!" });
    }
  })
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
  const sql = `DELETE FROM users WHERE id='${id}';`;

  users.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "User sikeresen törölve!" });
    } else {
      res.status(403).send({ msg: "User törlése sikertelen!", err: err });
    }
  })
})

// USERS END

module.exports = router;
