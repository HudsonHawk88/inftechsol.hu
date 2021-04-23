const { Pool } = require("pg");
const poolJson = require("./pool.json");
const views = new Pool(poolJson.gdpr);

// PUBLIC REFERENCIAK START

module.exports = {
  getGdpr: (app) =>
    app.get("/gdpr", (req, res) => {
      let id = req.headers.id;
      if (id) {
        views.query(`SELECT * FROM gdpr WHERE id='${id}'`, (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send(err);
          }
        });
      } else {
        views.query("SELECT * FROM gdpr", (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send({ err: err });
          }
        });
      }
    }),

  addGdpr: (app) =>
    app.post("/gdpr", (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const felvitelObj = JSON.parse(data);
          // TODO adatbazis struktura kialakítása
          views.query(
            `CREATE TABLE IF NOT EXISTS gdpr (
          id text PRIMARY KEY DEFAULT uuid_generate_v4(),
          nev text DEFAULT NULL,
          tartalom text DEFAULT NULL         
       );`,
            (error) => {
              if (!error) {
                views.query(
                  `INSERT INTO public.gdpr(nev, tartalom) 
                  VALUES ('${felvitelObj.nev}'::text, '${felvitelObj.tartalom}'::text);`,
                  (err) => {
                    if (!err) {
                      res
                        .status(200)
                        .send({ msg: "GDPR sikeresen létrehozva!" });
                    } else {
                      res
                        .status(500)
                        .send({ err: "GDPR hozzáadása sikertelen!" });
                    }
                  }
                );
              } else {
                console.log("ERROR: ", error);
              }
            }
          );
        });
    }),

  editGdpr: (app) =>
    -app.put(`/gdpr`, (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const modositoObj = JSON.parse(data);
          const id = req.headers.id;
          views.query(
            `UPDATE public.gdpr
            SET id='${id}'::text, nev='${modositoObj.nev}'::text, tartalom='${modositoObj.tartalom}'::text
            WHERE id='${id}';`,
            (err) => {
              if (!err) {
                res.status(200).send({ msg: "GDPR sikeresen módosítva!" });
              } else {
                res.status(500).send({ err: "GDPR módosítása sikertelen!" });
              }
            }
          );
        });
    }),
  deleteGdpr: (app) =>
    app.delete("/gdpr", (req, res) => {
      let id = req.headers.id;
      views.query(`DELETE FROM public.gdpr WHERE id='${id}'`, (err) => {
        if (!err) {
          res.status(200).send({ msg: "GDPR sikeresen törölve!" });
        } else {
          res.status(403).send({ err: "GDPR törlése sikertelen!" });
        }
      });
    }),

  // PUBLIC REFERENCIÁK END
};
