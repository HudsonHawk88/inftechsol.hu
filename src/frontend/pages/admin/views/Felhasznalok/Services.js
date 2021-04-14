import { Microservices } from "../../../../commons/MicroServices";
const userUrl = window.location.origin + "/api/users";

export default class Services {
  static listUsers = () => {
    let result = Microservices.fetchApi(userUrl, {
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

  static addUser = (data) => {
    let result = Microservices.fetchApi(userUrl, {
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

  static editUser = (data, id) => {
    let result = Microservices.fetchApi(userUrl, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        token: id,
      },
      body: JSON.stringify(data),
    });
    return result;
  };

  static deleteUser = (id) => {
    let result = Microservices.fetchApi(userUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        token: id,
      },
    });
    return result;
  };
}
