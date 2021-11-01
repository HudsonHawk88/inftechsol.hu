import { Microservices } from "../../commons/MicroServices";

const authUrl = window.location.origin + "/api/auth";

const loginUrl = window.location.origin + "/api/login";

const tokenUrl = window.location.origin + "/api/token";

const logoutUrl = window.location.origin + "/api/logout";

export default class Services {
    static checkAuth = () => {
      let result = Microservices.fetchApi(authUrl, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          // "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
        }
      });
      return result;
    };

    static login = (user) => {
        let result = Microservices.fetchApi(loginUrl, {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            // "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
          },
          body: JSON.stringify(user)
        });
        return result;
    };

    static logout = (token) => {
        let result = Microservices.fetchApi(logoutUrl, {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "token": token
            // "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
          },
        });
        return result;
    };

    static refreshToken = (refreshToken) => {
        let result = Microservices.fetchApi(tokenUrl, {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "refreshToken": refreshToken
            // "Access-Control-Allow-Origin": "http://192.168.11.64:3000",
          },
        });
        return result;
    };
}
