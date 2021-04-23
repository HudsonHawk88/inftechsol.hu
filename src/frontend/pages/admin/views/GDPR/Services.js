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

  static addGdpr = (data) => {
    let result = Microservices.fetchApi(gdprUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
      },
      body: JSON.stringify(data),
    });
    return result;
  };

  static getGdpr = (id) => {
    let result = Microservices.fetchApi(gdprUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        id: id,
      },
    });
    return result;
  };

  static editGdpr = (data, id) => {
    let result = Microservices.fetchApi(gdprUrl, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        id: id,
      },
      body: JSON.stringify(data),
    });
    return result;
  };

  static deleteGdpr = (id) => {
    let result = Microservices.fetchApi(gdprUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        id: id,
      },
    });
    return result;
  };
}
