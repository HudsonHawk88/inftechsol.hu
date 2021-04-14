const { Pool } = require("pg");
const poolJson = require("./pool.json");
const orszagok = new Pool(poolJson.orszagok);

// ORSZAGOK START

module.exports = {
  getOrszagok: (app) =>
    app.get("/orszagok", (req, res) => {
      const id = req.headers.id;
      const like = req.headers.like;
      if (id) {
        orszagok.query(
          `SELECT * FROM orszagok WHERE id='${id}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send(err);
            }
          }
        );
      }
      if (like) {
        orszagok.query(
          `SELECT * FROM orszagok WHERE orszagnev LIKE '${like}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send(err);
            }
          }
        );
      } else {
        orszagok.query("SELECT * FROM orszagok", (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send({ err: err });
          }
        });
      }
    }),

  // ORSZAGOK END
};
