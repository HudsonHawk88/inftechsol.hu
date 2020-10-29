import { Microservices } from "../../commons/MicroServices";
const userUrl = window.location.origin + '/api/users';

export default class Services {
  static listUsers = () => {
    let result = Microservices.fetchApi(userUrl, {
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

  static getUser = async (id) => {
    let result = await Microservices.fetchApi(userUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.67:3000",
        "token": id
      }
    });
    return result
  };
  static addUser = async (data) => {
    let result = await Microservices.fetchApi(userUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.67:3000",
      },
      body: JSON.stringify(data),
    });
    return result;
  };
  static editUser = async (id, data) => {
    let result = await Microservices.fetchApi(userUrl, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.67:3000",
        "token": id
      },
      body: JSON.stringify(data),
    });
    return result;
  };
  static deleteUser = async (id) => {
    let result = await Microservices.fetchApi(userUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://192.168.11.67:3000",
        "token": id
      },
    });
    return result;
  };
}
