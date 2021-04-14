const { Pool } = require("pg");
const poolJson = require("./pool.json");
const views = new Pool(poolJson.elerhetosegek);

// ELÉRHETŐSÉGEK START

module.exports = {
  getElerhetosegek: (app) =>
    app.get("/elerhetosegek", (req, res) => {
      let id = req.headers.id;
      if (id) {
        views.query(
          `SELECT * FROM elerhetosegek WHERE id='${id}'`,
          (err, result) => {
            if (!err) {
              res.status(200).send(result.rows);
            } else {
              res.status(500).send(err);
            }
          }
        );
      } else {
        views.query("SELECT * FROM elerhetosegek", (err, result) => {
          if (!err) {
            res.status(200).send(result.rows);
          } else {
            res.status(500).send({ err: err });
          }
        });
      }
    }),

  addElerhetoseg: (app) =>
    app.post("/elerhetosegek", (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const felvitelObj = JSON.parse(data);
          views.query(
            `CREATE TABLE IF NOT EXISTS elerhetosegek (
            id text PRIMARY KEY DEFAULT uuid_generate_v4(),
            titulus text DEFAULT NULL,
            vezeteknev text DEFAULT NULL,
            keresztnev text DEFAULT NULL,
            orszag json DEFAULT NULL,
            irszam numeric DEFAULT NULL,
            telepules json DEFAULT NULL,
            postafiok text DEFAULT NULL,
            kozterulet text DEFAULT NULL,
            hazszam text DEFAULT NULL,
            hrsz text DEFAULT NULL,
            epulet text DEFAULT NULL,
            emelet text DEFAULT NULL,
            ajto text DEFAULT NULL,
            telefon text DEFAULT NULL,
            email text DEFAULT NULL
         );`,
            (error) => {
              if (!error) {
                console.log(felvitelObj.orszag);
                views.query(
                  `INSERT INTO public.elerhetosegek(titulus, vezeteknev, keresztnev, orszag, irszam, telepules, postafiok, kozterulet, hazszam, hrsz, epulet, emelet, ajto, telefon, email)
              VALUES ('${felvitelObj.titulus}'::text, '${
                    felvitelObj.vezeteknev
                  }'::text, '${felvitelObj.keresztnev}'::text,'${JSON.stringify(
                    felvitelObj.orszag
                  )}'::json,'${felvitelObj.irszam}'::numeric, '${JSON.stringify(
                    felvitelObj.telepules
                  )}'::json,
              '${felvitelObj.postafiok}'::text,'${
                    felvitelObj.kozterulet
                  }'::text,'${felvitelObj.hazszam}'::text,'${
                    felvitelObj.hrsz
                  }'::text,
              '${felvitelObj.epulet}'::text,'${felvitelObj.emelet}'::text,'${
                    felvitelObj.ajto
                  }'::text,'${felvitelObj.telefon}'::text,'${
                    felvitelObj.email
                  }'::text);`,
                  (err) => {
                    if (!err) {
                      res
                        .status(200)
                        .send({ msg: "Elérhetőség sikeresen létrehozva!" });
                    } else {
                      res
                        .status(500)
                        .send({ err: "Elérhetőség hozzáadása sikertelen!" });
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
  editElerhetoseg: (app) =>
    app.put(`/elerhetosegek`, (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const modositoObj = JSON.parse(data);
          const id = req.headers.id;
          views.query(
            `UPDATE public.elerhetosegek
          SET id='${id}', titulus='${modositoObj.titulus}', vezeteknev='${
              modositoObj.vezeteknev
            }', keresztnev='${modositoObj.keresztnev}', 
          orszag='${JSON.stringify(modositoObj.orszag)}', irszam='${
              modositoObj.irszam
            }', telepules='${JSON.stringify(modositoObj.telepules)}', 
          postafiok='${modositoObj.postafiok}', kozterulet='${
              modositoObj.kozterulet
            }', hazszam='${modositoObj.hazszam}', hrsz='${modositoObj.hrsz}',
          epulet='${modositoObj.epulet}', emelet='${
              modositoObj.emelet
            }', ajto='${modositoObj.ajto}', 
          telefon='${modositoObj.telefon}', email='${modositoObj.email}'
          WHERE id='${id}';`,
            (err) => {
              if (!err) {
                res
                  .status(200)
                  .send({ msg: "Elérhetőség sikeresen módosítva!" });
              } else {
                res
                  .status(500)
                  .send({ err: "Elérhetőség módosítása sikertelen!" });
              }
            }
          );
        });
    }),
  deleteElerhetoseg: (app) =>
    app.delete("/elerhetosegek", (req, res) => {
      let id = req.headers.id;
      views.query(
        `DELETE FROM public.elerhetosegek WHERE id='${id}'`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "Elérhetőség sikeresen törölve!" });
          } else {
            res.status(403).send({ err: "Elérhetőség törlése sikertelen!" });
          }
        }
      );
    }),

  // ELÉRHETŐSÉGEK END
};
