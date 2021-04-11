import { Microservices } from "../../commons/MicroServices";
const userUrl = window.location.origin + '/api/login';

export default class Services {

  static getUserData = (email, password) => {
    const result = Microservices.fetchApi(userUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Access-Control-Allow-Origin": "http://192.168.11.67:3000",
        "Content-Type": "application/json",
        "email": email,
        "password": password
      }
    });
    return result;
  };
}
