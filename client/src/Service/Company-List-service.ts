import axios, { CancelTokenSource } from "axios";
import RESTAPI from "./appconfig";
import * as LINK from "./API-constants";

const API = RESTAPI + LINK.SEARCH;
const headers = { "content-type": "application/json" };

let cancelToken: CancelTokenSource;

export const companyService = async (searchCompany: string): Promise<any> => {
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  cancelToken = axios.CancelToken.source();
  try {
    const res: any = await axios.post(
      API,
      { searchCompany },
      { headers, cancelToken: cancelToken.token }
    );

    console.log("before TRY - ", res);
    if (res && res.data) {
      console.log("try block -", res.data);
      return res.data;
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
