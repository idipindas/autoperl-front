import { createPlanApi, deletePlanApi, getAllPlanApi, getOnePlanApi, updatePlanApi } from "../api/plans/planApi";
import { PlanCreateType } from "../types/planTypes";

export const createPlan = async (data: PlanCreateType) => {
    try {
      const response = await createPlanApi(data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  export const getOnePlan = async (id:string) => {
    try {
      const response = await getOnePlanApi(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  export const getAllPlan = async () => {
    try {
      const response = await getAllPlanApi();
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  export const updatePlan = async (data: PlanCreateType,id:string) => {
    try {
      const response = await updatePlanApi(data,id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  export const deletePlan = async (id:string) => {
    try {
      const response = await deletePlanApi(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };