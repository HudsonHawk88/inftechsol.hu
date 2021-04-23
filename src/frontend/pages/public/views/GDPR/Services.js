import { Microservices } from "../../../../commons/MicroServices";
const gdprUrl = window.location.origin + "/api/gdpr";

export default class Services {
  static listGdpr = () => {
    let result = Microservices.fetchApi(gdprUrl, {
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
