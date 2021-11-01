const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const gdpr = new Pool(poolJson.gdpr);

// GDPR START

router.get('/', (req, res) => {
  let id = req.headers.id;
  if (id) {
    const sql = `SELECT * FROM gdpr WHERE id='${id}';`;
    gdpr.query(sql, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    const sql = `SELECT * FROM gdpr;`;
    gdpr.query(sql, (err, result) => {
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
  const sql = `CREATE TABLE IF NOT EXISTS gdpr (
    id text PRIMARY KEY DEFAULT uuid_generate_v4(),
    nev text DEFAULT NULL,
    tartalom text DEFAULT NULL         
 );`;
 gdpr.query((error) => {
   if (!error) {
    const sql = `INSERT INTO gdpr(nev, tartalom) VALUES($1, $2);`;

    gdpr.query(sql, [felvitelObj.nev, felvitelObj.tartalom], (err) => {
      if (!err) {
        res.status(200).send({ msg: "GDPR sikeresen létrehozva!" });
      } else {
        res.status(500).send({ err: "GDPR hozzáadása sikertelen!" });
      }
    })
   } else {
    res.status(500).send({ err: error, msg: 'Hiba történt az adatbázis létrehozásakor! Értesítse a weboldal rendszergazdáját!' })
   }
 })
})

router.put('/', (req, res) => {
  const modositoObj = JSON.parse(JSON.stringify(req.body));
  const id = req.headers.id;
  const sql = `UPDATE gdpr SET nev='${modositoObj.nev}', tartalom='${modositoObj.tartalom}' WHERE id='${id}';`;

  gdpr.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "GDPR sikeresen módosítva!" });
    } else {
      res.status(500).send({ err: "GDPR módosítása sikertelen!" });
    }
  })
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
  const sql = `DELETE FROM gdpr WHERE id='${id}';`;
  gdpr.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "GDPR sikeresen törölve!" });
    } else {
      res.status(500).send({ err: "GDPR törlése sikertelen!" });
    }
  });
})

// REFERENCIÁK END

module.exports = router;
