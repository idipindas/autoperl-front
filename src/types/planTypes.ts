export interface PlanCreateType {
    planName: string;
    planDescription: string;
    planPrice: number;
    planDuration: number;
    planServices: string[];
    isOfferValid: boolean;
    offerPercentage: number;
    offerDuration: number;
    documentStatus: boolean;
    createdUser: string;
  }
  