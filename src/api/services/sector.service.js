import api from "../client";

export const SectorService = {
  GetAllActiveSectors() {
    return api.get("/sectors");
  },

  GetSectorData(orgn, dest) {
    return api.get(`/sectors/currency-inter/${orgn}/${dest}`);
  },

  AddNewSector(data) {
    return api.post("/sectors", data);
  },

  GetSectorById(sectorId) {
    return api.get(`/sectors/${sectorId}`);
  },

  UpdateSectorByFlightNo(flightNo, leg, orgn, dest, data) {
    return api.put(`/sectors/${flightNo}/${leg}/${orgn}/${dest}`, data);
  },

  DeleteSectorByFlightNo(flightNo, leg, orgn, dest) {
    return api.delete(`/sectors/${flightNo}/${leg}/${orgn}/${dest}`);
  },
};
