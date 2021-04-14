const mailConfig = require("./mailconfig.json");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(mailConfig);

// MAIL START

module.exports = {
  sendContectMail: (app) =>
    app.post("/contactmail", (req, res) => {
      let data = "";
      req
        .on("data", (chunk) => {
          data += chunk;
        })
        .on("end", () => {
          const emailObj = JSON.parse(data);
          transporter.sendMail(
            {
              from: `${emailObj.nev} <${emailObj.email}>`, // sender address
              to: "info@inftechsol.hu", // list of receivers
              subject: `${emailObj.tema}`, // Subject line
              html: `<b>Kedves Tóth Gergő!</b><br><br>
            Az én nevem: ${emailObj.nev}.<br>
            Telefonszámom: ${emailObj.telefon}.<br><br>
            ${emailObj.uzenet}<br><br>
            Tiszteletel:<br>
            ${emailObj.nev}<br>
            `, // html body
            },
            (err) => {
              if (!err) {
                res.status(200).send({ msg: "E-mail sikeresen elküldve!" });
              } else {
                res.status(500).send({ err: err });
              }
            }
          );
        });
    }),

  // MAIL END
};
