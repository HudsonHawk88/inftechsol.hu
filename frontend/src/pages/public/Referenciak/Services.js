import { Microservices } from "../../../../commons/MicroServices";
const referenciakUrl = window.location.origin + "/api/referenciak";

export default class Services {
  static listReferenciak = () => {
    let result = Microservices.fetchApi(referenciakUrl, {
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
