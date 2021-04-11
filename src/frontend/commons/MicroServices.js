function handleResponse(response) {
    let data = response.json().then((adat) => {
      return adat;
    });
    return data;
}

class Microservices {

  static fetchApi = async (url, requestOptions) => {
    return await fetch(url, requestOptions).then(handleResponse);
  };
}

export { Microservices };
