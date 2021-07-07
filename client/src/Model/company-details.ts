export interface companyDetails {
    Date: number,
    _id : string;
    Open : number ,
    High : number ,
    Low : number ,
    Close : number ,    
    AdjClose : number ,
    Volume : number ,    
    Company : string 
}

export interface  companyServiceResponse{
    data : companyDetails[] ;
    count : number ; 
}