const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const referenciak = new Pool(poolJson.referenciak);

// REFERENCIAK START

router.get('/', (req, res) => {
  const id = req.headers.id;

  if (id) {
    const sql = `SELECT * FROM referenciak WHERE id='${id}';`;
    referenciak.query(sql,(err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    const sql = `SELECT * FROM referenciak;`;
    referenciak.query(sql, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
})

router.post('/', (req, res) => {
  const felvitelObj = JSON.parse(req.body);
  const sql = `CREATE TABLE IF NOT EXISTS szolgaltatasok (
    id text PRIMARY KEY DEFAULT uuid_generate_v4(),
    cegnev text DEFAULT NULL,
    leiras text DEFAULT NULL
  );`;

  referenciak.query(sql, (error) => {
    if (!error) {
      const sql = `INSERT INTO referenciak(cegnev, leiras) VALUES($1, $2);`;
      referenciak.query(sql, [felvitelObj.cegnev, felvitelObj.leiras], (err) => {
        if (!err) {
          res.status(200).send({ msg: "Referencia sikeresen létrehozva!" });
        } else {
          res.status(500).send({ msg: "Referencia hozzáadása sikertelen!", err: err });
        }
      });
    } else {
      res.status(500).send({ err: error, msg: 'Hiba történt az adatbázis létrehozásakor! Értesítse a weboldal rendszergazdáját!' })
    }
  })
})

router.put('/', (req, res) => {
  const modositoObj = JSON.parse(JSON.stringify(req.body));
  const id = req.headers.id;
  const sql = `UPDATE referenciak SET cegnev='${modositoObj.cegnev}', leiras='${modositoObj.leiras}' WHERE id='${id}';`;

  referenciak.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Referencia sikeresen módosítva!" });
    } else {
      res.status(500).send({ err: "Referencia módosítása sikertelen!" });
    }
  })
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
  const sql = `DELETE FROM referenciak WHERE id='${id}';`;
      referenciak.query(sql, (err) => {
        if (!err) {
          res.status(200).send({ msg: "Referencia sikeresen törölve!" });
        } else {
          res.status(403).send({ err: "Referencia törlése sikertelen!" });
        }
      });
})

// REFERENCIÁK END

module.exports = router;
