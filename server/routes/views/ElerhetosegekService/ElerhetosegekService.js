const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const elerhetosegek = new Pool(poolJson.elerhetosegek);

// ELÉRHETŐSÉGEK START

router.get('/', (req, res) => {
  const id = req.headers.id;
  if (id) {
    const sql = `SELECT * FROM elerhetosegek WHERE id='${id}';`;
    elerhetosegek.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    const sql = `SELECT * FROM elerhetosegek;`;
    elerhetosegek.query(sql, (err, result) => {
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
  const sql = `CREATE TABLE IF NOT EXISTS elerhetosegek (
    id text PRIMARY KEY DEFAULT uuid_generate_v4(),
    nev json DEFAULT NULL,
    cim json DEFAULT NULL,
    telefon json DEFAULT NULL,
    email text DEFAULT NULL,
 );`;
 elerhetosegek.query(sql, (error) => {
   if (!error) {
    const sql = `INSERT INTO elerhetosegek(nev, cim, telefon, email) VALUES ($1, $2, $3, $4);`
    elerhetosegek.query(sql, [felvitelObj.nev, felvitelObj.cim, felvitelObj.telefon, felvitelObj.email], (err) => {
      if (!err) {
        res.status(200).send({ msg: "Elérhetőség sikeresen létrehozva!" });
      } else {
        res.status(500).send({ err: "Elérhetőség létrehozása sikertelen!" });
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
  const sql = `UPDATE elerhetosegek SET titulus='${modositoObj.titulus}', vezeteknev='${modositoObj.vezeteknev}', keresztnev='${modositoObj.keresztnev}', orszag='${JSON.stringify(modositoObj.orszag)}', irszam='${modositoObj.irszam}', telepules='${JSON.stringify(modositoObj.telepules)}', postafiok='${modositoObj.postafiok}', kozterulet='${modositoObj.kozterulet}', hazszam='${modositoObj.hazszam}', hrsz='${modositoObj.hrsz}', epulet='${modositoObj.epulet}', emelet='${modositoObj.emelet}', ajto='${modositoObj.ajto}', telefon='${modositoObj.telefon}', email='${modositoObj.email}' WHERE id='${id}';`;
  elerhetosegek.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Elérhetőség sikeresen módosítva!" });
    } else {
      res.status(500).send({ err: "Elérhetőség módosítása sikertelen!" });
    }
  })
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
  const sql = `DELETE FROM elerhetosegek WHERE id=${id};`;
  elerhetosegek.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Elérhetőség sikeresen törölve!" });
    } else {
      res.status(403).send({ err: "Elérhetőség törlése sikertelen!" });
    }
  })
})

// ELÉRHETŐSÉGEK END

module.exports = router;
