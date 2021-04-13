const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const { Pool } = require("pg");
const poolJson = require("./pool.json");
const cors = require("cors");
const users = new Pool(poolJson[0]);
const views = new Pool(poolJson[1]);
const orszagok = new Pool(poolJson[2]);
const fs = require("fs");
const https = require("https");
const host = process.env.HOST ? process.env.HOST : "92.118.27.50";
const port = 8081;

const server = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/inftechsol.hu/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/inftechsol.hu/cert.pem"),
  },
  app
);

app.use(
  ["/", "/user", "/users", "/login", "/header", "/blog", "/referenciak", "/elerhetosegek", "/orszagok", "/telepulesek"],
  (req, res, next) => {
    express.json();
    res.setHeader("Access-Control-Allow-Origin", "http://192.168.11.67:3000");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    return next();
  }
);
app.options("*", cors());

app.get("/login", (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;
  users.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
    if (!err) {
      if (result.rows[0]) {
        if (result.rows[0].password === password) {
          res.status(200).send(result.rows);
        } else {
          res.status(409).send({ err: "Hibás jelszót adott meg!" });
        }
      } else {
        res
          .status(409)
          .send({ err: "Nincs ilyen email címmel regisztált felhasználó!" });
      }
    } else {
      res.status(500).send({ err: err });
    }
  });
});

app.get("/users", (req, res, next) => {
  let id = req.headers.token;
  if (id) {
    users.query(`SELECT * FROM users WHERE token='${id}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    users.query("SELECT * FROM users", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  }
});

app.post("/users", (req, res) => {
  let data = "";
  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const felvitelObj = JSON.parse(data);
      const token = uuidv4();
      users.query(
        `INSERT INTO public.users(token, username, password, vezeteknev, keresztnev, email, created_on, last_login, is_admin) VALUES ('${token}','${
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
});

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
        SET token = '${token}', username = '${modositoObj.username}', password = '${modositoObj.password}', vezeteknev = '${modositoObj.vezeteknev}', keresztnev = '${modositoObj.keresztnev}', email = '${modositoObj.email}', is_admin = '${modositoObj.isAdmin ? modositoObj.isAdmin : false}'
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
});

app.delete("/users", (req, res) => {
  const token = req.headers.token;
  users.query(`DELETE FROM public.users WHERE token='${token}'`, (err) => {
    if (!err) {
      res.status(200).send({ msg: "User sikeresen törölve!" });
    } else {
      res.status(403).send({ msg: "User törlése sikertelen!", err: err });
    }
  });
});

// PUBLIC HEADER

app.get("/header", (req, res) => {
  views.query(`SELECT * FROM header`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res
        .status(500)
        .send({ msg: "A header-ök lekérdezése sikertelen!", err: err });
    }
  });
});

// PUBLIC BLOG

app.get("/blog", (req, res) => {
  views.query(`SELECT * FROM blog`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res
        .status(500)
        .send({ msg: "A header-ök lekérdezése sikertelen!", err: err });
    }
  });
});

// PUBLIC REFERENCIAK

app.get("/referenciak", (req, res) => {
  let id = req.headers.id;
  if (id) {
    views.query(`SELECT * FROM referenciak WHERE id='${id}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    views.query("SELECT * FROM referenciak", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
});

app.post("/referenciak", (req, res) => {
  let data = "";
  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const felvitelObj = JSON.parse(data);
      const id = uuidv4();
      views.query(
        `INSERT INTO public.referenciak(id, company_name, description) VALUES ('${id}'::text, '${felvitelObj.company_name}'::text, '${felvitelObj.description}'::text);`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "Referencia sikeresen létrehozva!" });
          } else {
            res
              .status(500)
              .send({ msg: "Referencia hozzáadása sikertelen!", err: err });
          }
        }
      );
    });
});

app.put(`/referenciak`, (req, res) => {
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
            res.status(200).send({ msg: "Referencia sikeresen módosítva!" });
          } else {
            res.status(500).send({ err: "Referencia módosítása sikertelen!" });
          }
        }
      );
    });
});

app.delete("/referenciak", (req, res) => {
  let id = req.headers.id;
  views.query(`DELETE FROM public.referenciak WHERE id='${id}'`, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Referencia sikeresen törölve!" });
    } else {
      res.status(403).send({ err: "Referencia törlése sikertelen!" });
    }
  });
});

// ELERHETOSEGEK

app.get("/elerhetosegek", (req, res) => {
  let id = req.headers.id;
  if (id) {
    views.query(`SELECT * FROM elerhetosegek WHERE id='${id}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    views.query("SELECT * FROM elerhetosegek", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
});

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
       );`, (error) => {
         if(!error) {
           console.log(felvitelObj.orszag);
          views.query(
            `INSERT INTO public.elerhetosegek(titulus, vezeteknev, keresztnev, orszag, irszam, telepules, postafiok, kozterulet, hazszam, hrsz, epulet, emelet, ajto, telefon, email)
            VALUES ('${felvitelObj.titulus}'::text, '${felvitelObj.vezeteknev}'::text, '${felvitelObj.keresztnev}'::text,'${JSON.stringify(felvitelObj.orszag)}'::json,'${felvitelObj.irszam}'::numeric, '${JSON.stringify(felvitelObj.telepules)}'::json,
            '${felvitelObj.postafiok}'::text,'${felvitelObj.kozterulet}'::text,'${felvitelObj.hazszam}'::text,'${felvitelObj.hrsz}'::text,
            '${felvitelObj.epulet}'::text,'${felvitelObj.emelet}'::text,'${felvitelObj.ajto}'::text,'${felvitelObj.telefon}'::text,'${felvitelObj.email}'::text);`,
            (err) => {
              if (!err) {
                res.status(200).send({ msg: "Elérhetőség sikeresen létrehozva!" });
              } else {
                res.status(500).send({ err: "Elérhetőség hozzáadása sikertelen!" });
              }
            }
          );
         } else {
           console.log("ERROR: ", error);
         }
       }
      );
      // views.query(
      //   `INSERT INTO public.elerhetosegek(id, name, adress, phone, email) VALUES ('${id}'::text, '${felvitelObj.name}'::text, '${felvitelObj.adress}'::text, '${felvitelObj.phone}'::text, '${felvitelObj.email}'::text);`,
      //   (err) => {
      //     if (!err) {
      //       res.status(200).send({ msg: "Elérhetőség sikeresen létrehozva!" });
      //     } else {
      //       res.status(500).send({ err: "Elérhetőség hozzáadása sikertelen!" });
      //     }
      //   }
      // );
    });
});

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
        SET id='${id}', titulus='${modositoObj.titulus}', vezeteknev='${modositoObj.vezeteknev}', keresztnev='${modositoObj.keresztnev}', 
        orszag='${JSON.stringify(modositoObj.orszag)}', irszam='${modositoObj.irszam}', telepules='${JSON.stringify(modositoObj.telepules)}', 
        postafiok='${modositoObj.postafiok}', kozterulet='${modositoObj.kozterulet}', hazszam='${modositoObj.hazszam}', hrsz='${modositoObj.hrsz}',
        epulet='${modositoObj.epulet}', emelet='${modositoObj.emelet}', ajto='${modositoObj.ajto}', 
        telefon='${modositoObj.telefon}', email='${modositoObj.email}'
        WHERE id='${id}';`,
        (err) => {
          if (!err) {
            res.status(200).send({ msg: "Elérhetőség sikeresen módosítva!" });
          } else {
            res.status(500).send({ err: "Elérhetőség módosítása sikertelen!" });
          }
        }
      );
    });
});

app.delete("/elerhetosegek", (req, res) => {
  let id = req.headers.id;
  views.query(`DELETE FROM public.elerhetosegek WHERE id='${id}'`, (err) => {
    if (!err) {
      res.status(200).send({ msg: "Elérhetőség sikeresen törölve!" });
    } else {
      res.status(403).send({ err: "Elérhetőség törlése sikertelen!" });
    }
  });
});

// ORSZAGOK ÉS TELEPÜLÉSEK

app.get("/orszagok", (req, res) => {
  const id = req.headers.id;
  const like = req.headers.like;
  if (id) {
    orszagok.query(`SELECT * FROM orszagok WHERE id='${id}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } 
  if (like) {
    orszagok.query(`SELECT * FROM orszagok WHERE orszagnev LIKE '${like}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    orszagok.query("SELECT * FROM orszagok", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
});

app.get("/telepulesek", (req, res) => {
  const id = req.headers.id;
  const like = req.headers.like;
  if (id) {
    orszagok.query(`SELECT * FROM telepulesek WHERE irszam='${id}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  } 
  else if (like) {
    orszagok.query(`SELECT * FROM telepulesek WHERE telepulesnev LIKE '${like}'`, (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  } else {
    orszagok.query("SELECT * FROM telepulesek", (err, result) => {
      if (!err) {
        res.status(200).send(result.rows);
      } else {
        res.status(500).send({ err: err });
      }
    });
  }
});

server.listen(port, host);
console.log(`Server running at https://${host}:${port}/`);
