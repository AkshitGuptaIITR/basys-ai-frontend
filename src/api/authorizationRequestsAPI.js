import { dataService } from "./dataService";

const authorizationRequestsAPI = {
  getAllAuthorizationRequests: function () {
    return dataService.requestServer({
      method: "GET",
      url:
        dataService.DOMAIN_SERVER_URL +
        "/authorizationRequests/getAllAuthorizationRequests",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  createAuthorizationRequest: function (data, patientId) {
    return dataService.requestServer({
      method: "POST",
      url:
        dataService.DOMAIN_SERVER_URL +
        "/authorizationRequests/createAuthorizationRequest/" +
        patientId,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default authorizationRequestsAPI;
