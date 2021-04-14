const { Pool } = require("pg");
const poolJson = require("./pool.json");
const header = new Pool(poolJson.header);

// HEADER START

module.exports = {
  getHeaders: (app) =>
    app.get("/header", (req, res) => {
      header.query(`SELECT * FROM header`, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res
            .status(500)
            .send({ msg: "A header-ök lekérdezése sikertelen!", err: err });
        }
      });
    }),

  // HEADER END
};
