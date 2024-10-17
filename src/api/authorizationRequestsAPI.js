import { dataService } from "./dataService";

const authorizationRequestsAPI = {
  getAllAuthorizationRequests: function () {
    return dataService.requestServer({
      method: "GET",
      url:
        dataService.DOMAIN_SERVER_URL +
        "/authorizationRequests/getAllAuthorizationRequests",
    });
  },
};

export default authorizationRequestsAPI;
