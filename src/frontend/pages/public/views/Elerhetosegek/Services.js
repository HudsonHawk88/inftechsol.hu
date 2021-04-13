import { Microservices } from "../../../../commons/MicroServices";
const elerhetosegekUrl = window.location.origin + "/api/elerhetosegek";

export default class Services {
  static listElerhetosegek = () => {
    let result = Microservices.fetchApi(elerhetosegekUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.67:3000",
      },
    });
    return result;
  };
}