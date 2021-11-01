import { Microservices } from "../../../commons/MicroServices";
const elerhetosegekUrl = window.location.origin + "/api/elerhetosegek";
const orszagokUrl = window.location.origin + "/api/orszagok";
const telepulesekUrl = window.location.origin + "/api/telepulesek";

export default class Services {
  // ELERHETOSEGEK START

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

  static getElerhetoseg = (id) => {
    let result = Microservices.fetchApi(elerhetosegekUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        "Content-Type": "application/json",
        id: id,
      },
    });

    return result;
  };

  static addElerhetoseg = (data) => {
    let result = Microservices.fetchApi(elerhetosegekUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
      },
      body: JSON.stringify(JSON.parse(data)),
    });
    return result;
  };

  static editElerhetoseg = (data, id) => {
    let result = Microservices.fetchApi(elerhetosegekUrl, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        id: id,
      },
      body: JSON.stringify(JSON.parse(data)),
    });
    return result;
  };

  static deleteElerhetoseg = (id) => {
    let result = Microservices.fetchApi(elerhetosegekUrl, {
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

  // ELÉRHETŐSÉGEK END

  // ORSZAGOK START

  static listOrszagok = () => {
    let result = Microservices.fetchApi(orszagokUrl, {
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

  static listOrszagokLike = (like) => {
    let result = Microservices.fetchApi(orszagokUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        like: like,
      },
    });

    return result;
  };

  // ORSZAGOK END

  // TELEPÜLÉSEK START

  static listTelepulesek = () => {
    let result = Microservices.fetchApi(telepulesekUrl, {
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

  static getTelepules = (id) => {
    let result = Microservices.fetchApi(telepulesekUrl, {
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

  static listTelepulesekLike = (like) => {
    let result = Microservices.fetchApi(telepulesekUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        like: like,
      },
    });

    return result;
  };

  // TELEPÜLÉSEK END
}
