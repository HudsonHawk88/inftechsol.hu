import { Microservices } from "./commons/MicroServices";
const APIURL = window.location.origin + "/api";

export default class Services {
  // static listUsers = async () => {
  //   let result = [];
  //   const users = await fetch(APIURL + "/");
  //   result.push(await users.json());
  //   return result;
  // };
  static listUsers = async () => {
    let result = await Microservices.fetchApi(
      APIURL + "/users",
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result
  };
  static getUser = async (id) => {
    let result = [];
    // const response = await fetch(`${APIURL}/users?id='${id}'`, {
    //   method: "GET",
    //   mode: "cors",
    //   cache: "no-cache",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   qs: { id },
    // });
    // result = await response.json();
    return result;
  };
  static addUser = async (data) => {
    function UID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    data.id = UID();
    let object = [];
    object.push(data);
    const response = await fetch(`${APIURL}/users`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    return await response;
  };
  static editUser = async (data) => {
    const response = await fetch(`${APIURL}/users?id=${data.id}}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response;
  };
  static deleteUser = async (id) => {
    const response = await fetch(`${APIURL}/users?id=${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      qs: { id },
    });
    return await response;
  };
}
