const { Pool } = require("pg");
const poolJson = require("./pool.json");
const telepulesek = new Pool(poolJson.telepulesek);

// TELEPULESEK START

module.exports = {
  getTelepulesek: (app) =>
    app.get("/telepulesek", (req, res) => {
      const id = req.headers.id;
      const like = req.headers.like;
      if (id) {
        telepulesek.query(
          `SELECT * FROM telepulesek WHERE irszam='${id}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send({ err: err });
            }
          }
        );
      } else if (like) {
        telepulesek.query(
          `SELECT * FROM telepulesek WHERE telepulesnev LIKE '${like}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send({ err: err });
            }
          }
        );
      } else {
        telepulesek.query("SELECT * FROM telepulesek", (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send({ err: err });
          }
        });
      }
    }),

  // TELEPULESEK END
};
