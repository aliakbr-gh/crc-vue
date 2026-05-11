import api from "../client";

export const DashboardService = {
  GetKPIs() {
    return api.get("/dashboard/kpis");
  },
};
