export interface addServiceType{
    serviceName:string,
    serviceDescription:string,
    servicePrice:number
}
export interface ServiceList {
    _id: string;
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    documentStatus: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  