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
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000"
      }
    });
    return result;
  };

  static getSzolgaltatas = (id) => {
    let result = Microservices.fetchApi(szolgaltatasokUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        "id": id
      }
    });
    return result;
  };

  static addSzolgaltatas = (szolgObj) => {
    let result = Microservices.fetchApi(szolgaltatasokUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
      },
      body: JSON.stringify(szolgObj)
    });
    return result;
  };

  static editSzolgaltatas = (szolgObj, id) => {
    let result = Microservices.fetchApi(szolgaltatasokUrl, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        "id": id
      },
      body: JSON.stringify(szolgObj)
    });
    return result;
  };

  static deleteSzolgaltatas = (id) => {
    let result = Microservices.fetchApi(szolgaltatasokUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        "id": id
      },
    });
    return result;
  };
}
