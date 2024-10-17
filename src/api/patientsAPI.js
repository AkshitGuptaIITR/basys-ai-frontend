import { dataService } from "./dataService";

const patientAPI = {
  getAllPatients: function () {
    return dataService.requestServer({
      method: "GET",
      url: dataService.DOMAIN_SERVER_URL + "/patient/getAllPatients",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default patientAPI;
