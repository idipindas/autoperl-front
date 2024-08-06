import { PlanCreateType } from "../../types/planTypes";
import axiosInstance from "../axios/axiosInstance";

export const createPlanApi = (data: PlanCreateType) =>
  axiosInstance.post("/plan", data);
export const getOnePlanApi = (id: string) =>
  axiosInstance.get(`/plans/${id}`);
export const getAllPlanApi = () =>
  axiosInstance.get("/plans");
export const updatePlanApi = (data: PlanCreateType, id: string) =>
  axiosInstance.put(`/plans/${id}`, data);
export const deletePlanApi = (id: string) =>
  axiosInstance.delete(`/plans/${id}`);
