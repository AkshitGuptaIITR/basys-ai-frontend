import { dataService } from "./dataService";

const authAPI = {
  login: function (data) {
    return dataService.requestServer({
      method: "POST",
      url: dataService.DOMAIN_SERVER_URL + "/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
  },

  getLoggedInUser: function () {
    return dataService.requestServer({
      method: "GET",
      url: dataService.DOMAIN_SERVER_URL + "/auth/getLoggedInUser",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default authAPI;
