const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const blog = new Pool(poolJson.blog);

// BLOG START

router.get('/', (req, res) => {
  const id = req.headers.id;
  if (id) {
    const sql = `SELECT * FROM blog WHERE id='${id}';`;
    blog.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    const sql = `SELECT * FROM blog;`;
    blog.query(sql, (err, result) => {
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
  const sql = `CREATE TABLE IF NOT EXISTS blog (
    id text PRIMARY KEY DEFAULT uuid_generate_v4(),
    nev json DEFAULT NULL,
    cim json DEFAULT NULL,
    telefon json DEFAULT NULL,
    email text DEFAULT NULL,
 );`;
 blog.query(sql, (error) => {
   if (!error) {
    const sql = `INSERT INTO blog(nev, cim, telefon, email) VALUES ($1, $2, $3, $4);`
    blog.query(sql, [felvitelObj.nev, felvitelObj.cim, felvitelObj.telefon, felvitelObj.email], (err) => {
      if (!err) {
        res.status(200).send({ msg: "Blogbejegyzés sikeresen létrehozva!" });
      } else {
        res.status(500).send({ err: "Blogbejegyzés létrehozása sikertelen!" });
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
  const sql = `UPDATE blog SET nev='${modositoObj.nev}', cim='${modositoObj.cim}, telefon='${modositoObj.telefon}', email='${modositoObj.telefon}' WHERE id='${id}'';`;
  blog.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Blogbejegyzés sikeresen módosítva!" });
    } else {
      res.status(500).send({ err: "Blogbejegyzés módosítása sikertelen!" });
    }
  })
})

router.delete('/', (req, res) => {
  const id = req.headers.id;
  const sql = `DELETE FROM blog WHERE id=${id};`;
  blog.query(sql, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Blogbejegyzés sikeresen törölve!" });
    } else {
      res.status(403).send({ err: "Blogbejegyzés törlése sikertelen!" });
    }
  })
})

// BLOG END

module.exports = router;
