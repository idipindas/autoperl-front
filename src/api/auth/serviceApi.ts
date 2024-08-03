import { addServiceType } from "../../types/serviceTypes";
import axiosInstance from "../axios/axiosInstance";

export const createServiceApi = (data:addServiceType)=> axiosInstance.post('//service-list/create',data);

export const getAllServicesApi = ()=> axiosInstance.get('/service-list/getAll');
export const updateServiceApi = (data:addServiceType,id:string) => axiosInstance.put(`/service-list/edit/${id}`,data)
export const deleteServiceApi = (id:string) => axiosInstance.delete(`/service-list/delete/${id}`)