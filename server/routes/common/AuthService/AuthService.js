const { Pool } = require("pg");
const poolJson = require("./pool.json");
const users = new Pool(poolJson.users);
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { restart } = require("nodemon");

const JWT = {
    secret: process.env.JWT_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET
};

router.get("/auth", (req, res) => {
  //get the session ID from the cookies
  const token = req.cookies.JWT_TOKEN;
  if (token) {
      //if the cookie is set, query the db
      //get the user and role 
      //we are taking a hit everytime a user makes a request
      const user = validateToken(token, JWT.secret);
      //session no longer there, expired etc.. 
      //send back login page
      if (user === null)  
         res.status(409).send({ authenticated: false, msg: 'Nincs belépve! Kérem jelentkezzen be!' })
      else {
          //cook the user page
          res.status(200).send({ authenticated: true })
      }
  } else {
      res.status(200).send({ authenticated: false, msg: 'Nincs belépve! Kérem jelentkezzen be!' })
  }
})

router.post("/token", async (req, res) => {

  const token = req.headers.refreshtoken;
  const user = validateToken(token, JWT.refresh)
  
  if (user === null) {
      const sql = `UPDATE users SET token=NULL WHERE token='${token}';`;
      await users.query(sql, (error) => {
        if (!error) {
          res.sendStatus(403);
        } else {
          res.status(409).send({ err: error })
        }
      });
      return;
  }
  //now that we know the refresh token is valid 
  //lets take an extra hit the database 
  const result = await users.query("SELECT * FROM users WHERE token = $1", [token])
  if (result.rowCount === 0) {
    res.sendStatus(403);
  } else {
    const user = result.rows[0];
    //sign my jwt 
    const payLoad = { "name": user.username, "role": user.role }
    //sign a brand new accesstoken and update the cookie
    const token = jwt.sign(payLoad, JWT.secret , { algorithm: 'HS256', expiresIn: 30})
    //maybe check if it succeeds..                          
    res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly;`])  
    res.status(200).send({ user: { username: user.username, nev: user.nev }, token: token })
  }
});

router.post("/login", async (req, res) => {
  try { 

  const userObj = JSON.parse(JSON.stringify(req.body))
  const sql = "SELECT * FROM users WHERE email = $1"
  const result = await users.query(sql,[userObj.email]);
  
  
  //fail
  if (result.rowCount === 0)
      res.status(409).send({ err: "Nincs ilyen felhasználó regisztrálva!" })
  else {
      //compare salted password
      const saltedPassword = result.rows[0].password;
      
      const successResult = await bcrypt.compare(userObj.password, saltedPassword)
   
      //logged in successfully generate session
      if (successResult === true) {
          const user = result.rows[0];
          //sign my jwt 
          const payLoad = { "name": user.username, "role": user.role }
          const token = jwt.sign(payLoad, JWT.secret , { algorithm: 'HS256', expiresIn: 30})
          const refreshtoken = jwt.sign(payLoad, JWT.refresh, { algorithm: 'HS256'})

          //save the refresh token in the database 
          users.query("UPDATE users SET token = $1 WHERE email = $2", [refreshtoken, user.email])
          //maybe check if it succeeds..                          
          res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly;`])
          res.status(200).send({ user: { username: user.username, nev: user.nev }, token: token, refreshToken: refreshtoken })
      } else {
        res.status(409).send({ err: "Helytelen jelszó!" })
      }
  }
}
catch  (ex){
    console.error(ex)
}    
})

router.post("/register", async (req, res) => {
  //check if user exist 
  const felvitelObj = JSON.parse(JSON.stringify(req.body));

      //the hash has the salt
      const hash =  await bcrypt.hash(felvitelObj.password, 10)
      //store user, password and role
      const sql = `CREATE TABLE IF NOT EXISTS users (
        id text PRIMARY KEY DEFAULT uuid_generate_v4(),
        nev json DEFAULT NULL,
        cim json DEFAULT NULL,
        telefon json DEFAULT NULL,
        username text DEFAULT NULL,
        email text DEFAULT NULL,
        password text DEFAULT NULL,
        token text DEFAULT NULL,
        roles text ARRAY
      );`
      users.query(
        sql,
      async (error) => {
        if (!error) {
          const sqlEmail = "SELECT email FROM users WHERE email = $1";
          const resultEmail = await users.query(sqlEmail, [felvitelObj.email]);
          
          //success, user is not there create it 
          if (resultEmail.rowCount === 0) {
            const sqlInsert = `INSERT INTO users (nev, cim, telefon, username, email, password, roles)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`
            users.query(
              sqlInsert, [felvitelObj.nev, felvitelObj.cim, felvitelObj.telefon, felvitelObj.username, felvitelObj.email, hash, {}],
              (err) => {
                if (!err) {
                  res
                    .status(200)
                    .send({ msg: "User sikeresen létrehozva!" });
                } else {
                  res
                    .status(409)
                    .send({ err: "User hozzáadása sikertelen!" });
                } 
              } 
            );
          } else {
            res.status(409).send({ err: "Ezzel a felhasználónévvel / email címmel már regisztráltak!" })
          }
        } 
      }
    );
})

router.post("/logout", (req, res) => {

  //logging out 
  const token = req.headers.token;
  if (token) {
      const sql = `UPDATE users SET token=NULL WHERE token=$1;`
      users.query(sql, [token], (error) => {
        if (!error) {
          res.status(200).send({ success: true, msg: 'Sikeresen kijelentkezett!' });
        } else {
          res.status(409).send({ err: error })
        }
      });
  }
})

module.exports = router;

function validateToken(token, secret) {
  try {
      const result  = jwt.verify(token, secret);
    
      return {
          "name": result.name,
          "role": result.role,
      }
  }
  catch(ex){
      return null;
  }
}


