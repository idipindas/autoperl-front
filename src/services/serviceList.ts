import {
  createServiceApi,
  deleteServiceApi,
  getAllServicesApi,
  getOneServiceApi,
  updateServiceApi,
} from "../api/service/serviceApi";
import { addServiceType } from "../types/serviceTypes";

export const createService = async (data: addServiceType) => {
  try {
    const response = await createServiceApi(data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateService = async (data: addServiceType, id: string) => {
  try {
    const response = await updateServiceApi(data, id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOneService = async (id: string) => {
  try {
    const response = await getOneServiceApi(id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllServices = async () => {
  try {
    const response = await getAllServicesApi();
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await deleteServiceApi(id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
