import api from "../client";

export const FlightUpdationService = {
  CheckFlightInformation(data) {
    return api.post("/flight-updation/flight-information/check", data);
  },

  GetFlightInformation(data) {
    return api.post("/flight-updation/flight-information", data);
  },

  GetFlightLoadGraphData(data) {
    return api.post("/flight-updation/load-graph", data);
  },

  UpdateFlightInformation(data) {
    return api.post("/flight-updation/flight-information/update", data);
  },

  GetFareTypeManagement(data) {
    return api.post("/flight-updation/fare-type-management", data);
  },

  GetFlightClassData(data) {
    return api.post("/flight-updation/class-management", data);
  },

  UpdateFlightClassData(data) {
    return api.post("/flight-updation/class-management/update", data);
  },

  AddFlightSpecialFare(data) {
    return api.post("/flight-updation/specialfare/update", data);
  },

  AddFlightChangePolicyFare(data) {
    return api.post("/flight-updation/changepolicy/update", data);
  },

  GetDefaultChangePolicyFare(data) {
    return api.post("/rangeflightupdate/specialfaretype", data);
  },

  GetSpecialFares(data) {
    return api.post("/flight-updation/fare-type-management/special-fare", data);
  },

  GetChangePolicyFares(data) {
    return api.post(
      "/flight-updation/fare-type-management/change-policy",
      data
    );
  },

  RemoveSpecialFare(data) {
    return api.post("/flight-updation/specialfare/remove", data);
  },

  GetDefaultReturnDiscount(data) {
    return api.post("/flight-updation/return-discount-management", data);
  },

  GetDefaultSpecialReturnDiscount(data) {
    return api.post(
      "/flight-updation/return-discount-management/special-fare",
      data
    );
  },

  AddSpecialReturnDiscount(data) {
    return api.post(
      "/flight-updation/return-discount-management/specialfare/update",
      data
    );
  },

  RemoveSpecialReturnDiscount(data) {
    return api.post(
      "/flight-updation/return-discount-management/specialfare/remove",
      data
    );
  },

  GetFlightTrends(data) {
    return api.post("/flight-updation/flight-trends", data);
  },

  GetAllFlightAncillaries(data) {
    return api.post("/flight-updation/ancillaries", data);
  },

  UpdateFlightAncillaries(data) {
    return api.post("/flight-updation/ancillaries/update", data);
  },

  CancelSingleFlight(data) {
    return api.post("/flight-updation/cancel", data);
  },

  OpenCancelSingleFlight(data) {
    return api.post("/flight-updation/open", data);
  },

  GetNotRR(data) {
    return api.post("/flight-updation/non-reconfirmed", data);
  },

  FlightSoldOut(data) {
    return api.post("/flight-updation/sold-out", data);
  },

  FlightOpenForSale(data) {
    return api.post("/flight-updation/open-sale", data);
  },

  RemoveFlightWaiver(data) {
    return api.post("/flight-updation/remove-waiver", data);
  },
};
