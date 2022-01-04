import { Microservices } from "../../../commons/MicroServices";
const elerhetosegekUrl = window.location.origin + "/api/elerhetosegek";
const mailUrl = window.location.origin + "/api/contactmail";
const rechaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify?'

export default class Services {
  static listElerhetosegek = () => {
    let result = Microservices.fetchApi(elerhetosegekUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
      },
    });
    return result;
  };

  static sendMail = (mailObj) => {
    let result = Microservices.fetchApi(mailUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
      },
      body: JSON.stringify(mailObj),
    });
    return result;
  };

  static checkRechaptcha = (keys) => {
    let result = Microservices.fetchApi(rechaptchaUrl + new URLSearchParams(keys), {
      method: "POST",
      // mode: "cors",
      // cache: "no-cache",
      // headers: {
      //   "Content-Type": "application/json"
      // },
      
    });
    return result;
  };
}
