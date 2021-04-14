const { Pool } = require("pg");
const poolJson = require("./pool.json");
const users = new Pool(poolJson.users);

// LOGIN START

module.exports = {
  getLogin: (app) =>
    app.get("/login", (req, res) => {
      const email = req.headers.email;
      const password = req.headers.password;
      users.query(
        `SELECT * FROM users WHERE email='${email}'`,
        (err, result) => {
          if (!err) {
            if (result.rows[0]) {
              if (result.rows[0].password === password) {
                res.status(200).send(result.rows);
              } else {
                res.status(409).send({ err: "Hibás jelszót adott meg!" });
              }
            } else {
              res.status(409).send({
                err: "Nincs ilyen email címmel regisztált felhasználó!",
              });
            }
          } else {
            res.status(500).send({ err: err });
          }
        }
      );
    }),

  // LOGIN END
};
