const { Pool } = require("pg");
const poolJson = require("./pool.json");
const views = new Pool(poolJson.referenciak);

// PUBLIC REFERENCIAK START

module.exports = {
  getReferenciak: (app) =>
    app.get("/referenciak", (req, res) => {
      let id = req.headers.id;
      if (id) {
        views.query(
          `SELECT * FROM referenciak WHERE id='${id}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send(err);
            }
          }
        );
      } else {
        views.query("SELECT * FROM referenciak", (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send({ err: err });
          }
        });
      }
    }),

  addReferencia: (app) =>
    app.post("/referenciak", (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const felvitelObj = JSON.parse(data);
          views.query(
            `INSERT INTO public.referenciak(company_name, description) VALUES ('${felvitelObj.company_name}'::text, '${felvitelObj.description}'::text);`,
            (err) => {
              if (!err) {
                res
                  .status(200)
                  .send({ msg: "Referencia sikeresen létrehozva!" });
              } else {
                res
                  .status(500)
                  .send({ msg: "Referencia hozzáadása sikertelen!", err: err });
              }
            }
          );
        });
    }),
  editReferencia: (app) =>
    -app.put(`/referenciak`, (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const modositoObj = JSON.parse(data);
          const id = req.headers.id;
          views.query(
            `UPDATE public.referenciak
                            SET id='${id}', company_name='${modositoObj.company_name}', description='${modositoObj.description}'
                            WHERE id='${id}';`,
            (err) => {
              if (!err) {
                res
                  .status(200)
                  .send({ msg: "Referencia sikeresen módosítva!" });
              } else {
                res
                  .status(500)
                  .send({ err: "Referencia módosítása sikertelen!" });
              }
            }
          );
        });
    }),
  deleteReferencia: (app) =>
    app.delete("/referenciak", (req, res) => {
      let id = req.headers.id;
      views.query(`DELETE FROM public.referenciak WHERE id='${id}'`, (err) => {
        if (!err) {
          res.status(200).send({ msg: "Referencia sikeresen törölve!" });
        } else {
          res.status(403).send({ err: "Referencia törlése sikertelen!" });
        }
      });
    }),

  // PUBLIC REFERENCIÁK END
};
