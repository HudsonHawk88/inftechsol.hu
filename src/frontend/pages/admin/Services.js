import { Microservices } from "../../commons/MicroServices";
const userUrl = window.location.origin + "/api/users";

export default class Services {
  static getUser = (id) => {
    let result = Microservices.fetchApi(userUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        "Content-Type": "application/json",
        token: id,
      },
    });
    return result;
  };
}
