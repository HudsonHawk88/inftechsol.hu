const mailConfig = require("./mailconfig.json");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(mailConfig);
const router = require('express').Router();

// MAIL START

router.post('/', (req, res) => {
  const emailObj = JSON.parse(JSON.stringify(req.body));
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
        res.status(500).send({ err: err, msg: "Email küldése sikertelen!" });
      }
    }
  );
})

// MAIL END

module.exports = router;
