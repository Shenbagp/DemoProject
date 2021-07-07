import axios from "axios";
import RESTAPI from "./appconfig";
import { companyServiceResponse } from "./../Model/company-details";
import * as LINK from "./API-constants";

const API = RESTAPI + LINK.FETCH_RECORDS;
const headers = { "content-type": "application/json" };

export const fetchRecords = async (
  company: string,
  page: number,
  size: number
): Promise<any> => {
  console.log("company -", company, "page -", page, "size -", size);
  try {
    const res: companyServiceResponse = await axios.post(
      API,
      { company, page, size },
      { headers }
    );
    console.log("res in service block-", res);
    if (res && res.data) {
      console.log("try block -", res.data);
      return res.data;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};
