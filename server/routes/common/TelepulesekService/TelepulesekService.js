const { Pool } = require("pg");
const router = require('express').Router();
const poolJson = require("./pool.json");
const telepulesek = new Pool(poolJson.telepulesek);

// TELEPULESEK START

router.get('/', (req, res) => {
  const id = req.headers.id;
  const like = req.headers.like;
  if (id) {
    const sql = `SELECT * FROM telepulesek WHERE irszam='${id}';`;
    telepulesek.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send({ err: err });
        }
      }
    );
  } else if (like) {
    const sql = `SELECT * FROM telepulesek WHERE telepulesnev LIKE '${like}';`;
    telepulesek.query(sql, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res.status(500).send({ err: err });
        }
      }
    );
  } else {
    const sql = `SELECT * FROM telepulesek;`;
    telepulesek.query(sql, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
})

// TELEPULESEK END

module.exports = router;
