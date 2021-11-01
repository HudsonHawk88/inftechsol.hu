const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const header = new Pool(poolJson.header);

// HEADER START

router.get('/', (req, res) => {
  const id = req.headers.id;
  if (id) {
    const sql = `SELECT * FROM header WHERE id='${id}';`;
    header.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    const sql = `SELECT * FROM header;`;
    header.query(sql, (err, result) => {
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
  const sql = `CREATE TABLE IF NOT EXISTS header (
    id text PRIMARY KEY DEFAULT uuid_generate_v4(),
    nev json DEFAULT NULL,
    icon json DEFAULT NULL,
    link json DEFAULT NULL
 );`;
 header.query(sql, (error) => {
   if (!error) {
    const sql = `INSERT INTO header(nev, icon, link) VALUES ($1, $2, $3);`
    header.query(sql, [felvitelObj.nev, felvitelObj.icon, felvitelObj.link], (err) => {
      if (!err) {
        res.status(200).send({ msg: "Menüpont sikeresen létrehozva!" });
      } else {
        res.status(500).send({ err: "Menüpont létrehozása sikertelen!" });
      }
    })
   } else {
    res.status(500).send({ err: error, msg: 'Hiba történt az adatbázis létrehozásakor! Értesítse a weboldal rendszergazdáját!' })
   }
 })
})

router.put('/', (req, res) => {
  const modositoObj = JSON.parse(req.body);
  const id = req.headers.id;
  const sql = `UPDATE header SET nev='${modositoObj.nev}', icon='${modositoObj.icon}, link='${modositoObj.link}' WHERE id='${id}'';`;
  header.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Menüpont sikeresen módosítva!" });
    } else {
      res.status(500).send({ err: "Menüpont módosítása sikertelen!" });
    }
  })
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
  const sql = `DELETE FROM header WHERE id=${id};`;
  header.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Menüpont sikeresen törölve!" });
    } else {
      res.status(403).send({ err: "Menüpont törlése sikertelen!" });
    }
  })
})


module.exports = router;
