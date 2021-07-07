
 
import { companyServiceResponse } from "./../../Model/company-details";
import {Action } from "./../actions";
import { Types } from "./../types"

const initialState = {
    data : [] ,
    count : 0
}


export const fetchReducer = ( state : companyServiceResponse = initialState , action : Action) :companyServiceResponse =>{
    switch ( action.type) {
        case Types.FETCH_RECORDS : {
                return  { 
                    ...state,
                    data : action.payload.data ,
                    count : action.payload.count
                } 
        }
        default : 
            return state ; 
    }
    
}