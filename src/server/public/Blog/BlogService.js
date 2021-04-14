const { Pool } = require("pg");
const poolJson = require("./pool.json");
const blog = new Pool(poolJson.blog);

// BLOG START

module.exports = {
  getBlogs: (app) =>
    app.get("/blog", (req, res) => {
      blog.query(`SELECT * FROM blog`, (err, result) => {
        if (!err) {
          res.status(200).send(result.rows);
        } else {
          res
            .status(500)
            .send({ msg: "A header-ök lekérdezése sikertelen!", err: err });
        }
      });
    }),

  // BLOG END
};
