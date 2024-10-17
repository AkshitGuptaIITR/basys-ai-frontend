import axios from "axios";
import config from "../config";

const dataService = {
  DOMAIN_SERVER_URL: config.REACT_APP_SERVER_URL,

  requestServer: function (requestObj) {
    // to send the jwt token containing cookie to the server
    requestObj.withCredentials = true;

    let promise = new Promise((resolve, reject) => {
      axios(requestObj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  },
};
export { dataService };
