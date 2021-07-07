 
  import { Types } from "./../types" ;
  import { companyServiceResponse } from "./../../Model/company-details"

  export interface fetch  {
      type: Types.FETCH_RECORDS,
      payload : companyServiceResponse
  }

   

   
  export type Action  = fetch  