const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const orszagok = new Pool(poolJson.orszagok);

// ORSZAGOK START

router.get('/', (req, res) => {
  const id = req.headers.id;
  const like = req.headers.like;
  if (id) {
    const { id } = req.headers
    const sql = `SELECT * FROM orszagok WHERE id='${id}';`;
    orszagok.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else if (like) {
    const { like } = req.headers
    const sql = `SELECT * FROM orszagok WHERE orszagnev LIKE '${like}';`;
    orszagok.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send(err);
        }
      }
    );
  } else {
    const sql = `SELECT * FROM orszagok;`;
    orszagok.query(sql, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
})

module.exports = router;
