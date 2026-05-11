import api from "../client";

export const UserService = {
  loginUser(payload) {
    return api.post("/login", payload);
  },
};