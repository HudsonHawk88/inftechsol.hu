import { Microservices } from "../../../commons/MicroServices";
const szolgaltatasokUrl = window.location.origin + "/api/szolgaltatasok";

export default class Services {
  static listSzolgaltatasok = () => {
    let result = Microservices.fetchApi(szolgaltatasokUrl, {
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
}
