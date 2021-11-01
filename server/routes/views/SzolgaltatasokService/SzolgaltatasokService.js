const { Pool } = require("pg");
const poolJson = require("./pool.json");
const szolgaltatasok = new Pool(poolJson.szolgaltatasok);
const router = require('express').Router();


// SZOLGALTATASOK START
router.get('/', (req, res) => {
  const { id, like } = req.headers;
  if (id) {
    const sql = `SELECT * FROM szolgaltatasok WHERE id='${id}';`;
    szolgaltatasok.query(
      sql,
      (err, result) => {
        if (!err) {
          res.status(200).send(result.rows[0]);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else if (like) {
    const sql = `SELECT * FROM szolgaltatasok WHERE nev LIKE '${like}';`;
    szolgaltatasok.query(
      sql,
      (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    const sql = `SELECT * FROM szolgaltatasok;`;
    szolgaltatasok.query(sql, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
})

router.post('/', (req, res) => {
  const felvitelObj = JSON.parse(JSON.stringify(req.body));
  const sql = `CREATE TABLE IF NOT EXISTS szolgaltatasok (
    id text PRIMARY KEY DEFAULT uuid_generate_v4(),
    nev text DEFAULT NULL,
    kategoria text DEFAULT NULL,
    leiras text DEFAULT NULL,
    ar text DEFAULT NULL
  );`
  szolgaltatasok.query(sql, (error) => {
    if (!error) {
      const sql = 'INSERT INTO szolgaltatasok(nev, kategoria, leiras, ar) VALUES ($1, $2, $3, $4);';
      szolgaltatasok.query(
        sql, [felvitelObj.nev, felvitelObj.kategoria, felvitelObj.leiras, felvitelObj.ar],
        (err) => {
          if (!err) {
            res
              .status(200)
              .send({ msg: "Szolgáltatás sikeresen létrehozva!" });
          } else {
            res
              .status(500)
              .send({ err: "Szolgáltatás hozzáadása sikertelen!" });
          }
        }
      );
    } else {
      res.status(500).send({ err: error, msg: 'Hiba történt az adatbázis létrehozásakor! Értesítse a weboldal rendszergazdáját!' })
    }
  })
})

router.put('/', (req, res) => {
  const modositoObj = JSON.parse(JSON.stringify(req.body));
  const id = req.headers.id;
  const sql = `UPDATE szolgaltatasok SET nev='${modositoObj.nev}', kategoria='${modositoObj.kategoria}', leiras='${modositoObj.leiras}', ar='${modositoObj.ar}' WHERE id='${id}'`
  
  szolgaltatasok.query(
    sql, (err) => {
      if (!err) {
        res.status(200).send({ msg: "Szolgáltatás sikeresen módosítva!" });
      } else {
        res.status(500).send({ err: "Szolgáltatás módosítása sikertelen!" });
      }
    }
  );
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
      szolgaltatasok.query(`DELETE FROM szolgaltatasok WHERE id='${id}'`, (err) => {
        if (!err) {
          res.status(200).send({ msg: "Szolgáltatás sikeresen törölve!" });
        } else {
          res.status(403).send({ msg: "Szolgáltatás törlése sikertelen!", err: err });
        }
      });
})

// SZOLGALTATASOK END

module.exports = router;
