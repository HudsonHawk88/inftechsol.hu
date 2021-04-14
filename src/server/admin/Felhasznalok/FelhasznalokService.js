const { Pool } = require("pg");
const poolJson = require("./pool.json");
const users = new Pool(poolJson.users);

// USERS START

module.exports = {
  getUsers: (app) =>
    app.get("/users", (req, res, next) => {
      let id = req.headers.token;
      if (id) {
        users.query(
          `SELECT * FROM users WHERE token='${id}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send(err);
            }
          }
        );
      } else {
        users.query("SELECT * FROM users", (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send(err);
          }
        });
      }
    }),

  addUser: (app) =>
    app.post("/users", (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const felvitelObj = JSON.parse(data);
          users.query(
            `INSERT INTO public.users( username, password, vezeteknev, keresztnev, email, created_on, last_login, is_admin) VALUES ('${
              felvitelObj.username
            }','${felvitelObj.password}', '${felvitelObj.vezeteknev}', '${
              felvitelObj.keresztnev
            }', '${felvitelObj.email}', '${felvitelObj.created_on}', '${
              felvitelObj.last_login
            }', ${false});`,
            (err) => {
              if (!err) {
                res.status(200).send({ msg: "User sikeresen létrehozva!" });
              } else {
                res
                  .status(500)
                  .send({ msg: "User hozzáadása sikertelen!", err: err });
              }
            }
          );
        });
    }),
  editUser: (app) =>
    app.put(`/users`, (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const modositoObj = JSON.parse(data);
          const token = req.headers.token;
          users.query(
            `UPDATE public.users
          SET token = '${token}', username = '${
              modositoObj.username
            }', password = '${modositoObj.password}', vezeteknev = '${
              modositoObj.vezeteknev
            }', keresztnev = '${modositoObj.keresztnev}', email = '${
              modositoObj.email
            }', is_admin = '${
              modositoObj.isAdmin ? modositoObj.isAdmin : false
            }'
          WHERE token = '${token}';`,
            (err) => {
              if (!err) {
                res.status(200).send({ msg: "User sikeresen módosítva!" });
              } else {
                res.status(500).send({ err: "User módosítása sikertelen!" });
              }
            }
          );
        });
    }),
  deleteUser: (app) =>
    app.delete("/users", (req, res) => {
      const token = req.headers.token;
      users.query(`DELETE FROM public.users WHERE token='${token}'`, (err) => {
        if (!err) {
          res.status(200).send({ msg: "User sikeresen törölve!" });
        } else {
          res.status(403).send({ msg: "User törlése sikertelen!", err: err });
        }
      });
    }),

  // USERS END
};
