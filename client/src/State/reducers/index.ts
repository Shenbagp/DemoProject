 import { combineReducers } from 'redux';
 import {fetchReducer } from "./fetch-company-details" ;
 
  

 export const reducers  = combineReducers ({ 
     fetchRecords : fetchReducer 
 })

