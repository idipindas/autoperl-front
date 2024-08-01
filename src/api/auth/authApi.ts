import axiosInstance from "../axios/axiosInstance";

export const loginApi = (email: string, password: string) =>
  axiosInstance.post("/auth/login", { email, password });

export const signupApi = (email: string, password: string) =>
  axiosInstance.post("/auth/signup", { email, password });
