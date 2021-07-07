import  { useEffect, useState, useCallback } from "react";
import * as _ from "lodash-es";
import * as Constants from "./../../constant";
import Table from "../../Shared/Table/Table";
import Card from "./../../Shared/Card/Card";
import Pagination from "../../Shared/Pagination/Pagination";
import Button from "./../../Shared/Button/Button";
import "./Search-component.css";
import * as ListService from "./../../Service/Company-List-service";
import * as FetchService from "./../../Service/Company-Records-service";
import {
  companyDetails,
  companyServiceResponse,
} from "./../../Model/company-details";

import moment from "moment";
import Chart from "./../Graph/Chart";

function Searchbar() {
  const [searchItem, setSearchItem] = useState("AAPL");
  const [autoSuggest, setAutoSugest] = useState([] as string[]);
  const [data, setData] = useState([] as companyDetails[]);
  const [tableData, setTableData] = useState("");
  const [view, setView] = useState("Table View");
  const [cardData, setCardData] = useState("");
  const [xaxis, setXaxis] = useState("High");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [graphYear, setGraphYear] = useState("");

  useEffect(() => {
    const initialData = "AAPL";
    fetchTableData(initialData, currentPage, pageSize, "Card View");
  }, []);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchItem = event.target.value;
    setSearchItem(searchItem);
    setData([]);
    setTableData("");
    setCardData("");
    setAutoSugest([]);
    searchItem = event.target.value;
    console.log("searchItem", searchItem);
    searchItem && debounceSearch(searchItem);
  };

  const debounceSearch = useCallback(
    _.debounce((value: string) => searchCompanyList(value), 100),
    []
  );

  const searchCompanyList = (searchItem: string) => {
    ListService.companyService(searchItem).then((res: Array<string>) => {
      console.log("response in the handler", res);
      const autoSuggest = res;
      autoSuggest && setAutoSugest(autoSuggest);
      console.log("autoSuggest -", autoSuggest);
    });
  };

  const autosuggestHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("!! - ", event.currentTarget.id);
    const value = event.currentTarget.id;
    setAutoSugest([]);
    setSearchItem(value);
    //("Table View")
  };

  const TableClickHandler = (id: string) => {
    console.log("Handler", id);
    setTableData("");
    setCardData("");
    setView(id);
    fetchTableData(searchItem, currentPage, pageSize, "Card View");
  };
  const CardClickHandler = (id: string) => {
    setTableData("");
    setCardData("");
    setView(id);
    setCurrentPage(currentPage);
    fetchCardData(searchItem, currentPage, pageSize, "Table View");
  };

  const fetchCardData = (
    searchItem: string,
    currentPage: number,
    pageSize: number,
    id: string
  ) => {
    console.log(" fetch Card Data");
    let cardData_: any = [];
    FetchService.fetchRecords(searchItem, currentPage, pageSize).then(
      (res: companyServiceResponse) => {
        console.log("Inside View Component- res", res.data);
        if (res.data && res.data.length) {
          console.log("Inside Card  loop");
          cardData_ = res.data.map((item: companyDetails) => {
            return (
              <Card key={item._id}>
                <div className="card__container">
                  <div className="card__display">
                    <span>
                      {" "}
                      <label style={{ fontStyle: "italic" }}>Date</label> :
                      {moment(item.Date).format("MMM DD yyyy")}
                    </span>
                    <span>
                      {" "}
                      <label style={{ fontStyle: "italic" }}> Open</label> :
                      {item.Open.toFixed(2)}
                    </span>
                    <span>
                      {" "}
                      <label style={{ fontStyle: "italic" }}> High </label> :
                      {item.High.toFixed(2)}
                    </span>
                    <span>
                      <label
                        style={{ fontStyle: "italic", paddingLeft: "19px" }}
                      >
                        Adj Close
                      </label>{" "}
                      :{item.AdjClose.toFixed(2)}
                    </span>
                  </div>
                  <div className="card__display">
                    <span>
                      <label style={{ fontStyle: "italic" }}>Volume</label> :
                      {item.Volume.toFixed(2)}
                    </span>
                    <span>
                      <label style={{ fontStyle: "italic" }}>Close</label> :
                      {item.Close.toFixed(2)}
                    </span>
                    <span>
                      <label style={{ fontStyle: "italic" }}>Low</label> :
                      {item.Low.toFixed(2)}
                    </span>
                    <span>
                      <label style={{ fontStyle: "italic" }}>Company</label> :
                      {item.Company}
                    </span>
                  </div>
                </div>
              </Card>
            );
          });
          console.log("data card__ ", cardData_);
          setCardData(cardData_);
          setData(res.data);
          //setView(id) ;
          console.log("121 %% data Card", cardData, view);
        }
      }
    );
  };

  const fetchTableData = (
    searchItem: string,
    currentPage: number,
    pageSize: number,
    id: string
  ) => {
    let data_: any = "";
    console.log("inside fetchTableData");
    FetchService.fetchRecords(searchItem, currentPage, pageSize).then(
      (res: companyServiceResponse) => {
        if (res.data && res.data.length) {
          console.log("##");
          data_ = res.data.map((item: companyDetails, index: number) => (
            <tr key={item._id}>
              <td> {moment(item.Date).format("MMM DD yyyy")}</td>
              <td key={item.Open}>{item.Open.toFixed(2)}</td>
              <td key={item.High}>{item.High.toFixed(2)}</td>
              <td key={item.Low}>{item.Low.toFixed(2)}</td>
              <td key={item.Close}>{item.Close.toFixed(2)}</td>
              <td key={item.AdjClose}>{item.AdjClose.toFixed(2)}</td>
              <td key={item.Volume}>{item.Volume.toFixed(2)}</td>
              <td key={item.Company + index}>{item.Company}</td>
            </tr>
          ));

          console.log(data_);
        }
        setTableData(data_);
        setData(res.data);
      }
    );
  };

  const onPageChange = (clickedPage: number) => {
    console.log("inside Page Chnage");
    console.log("clickedPage", clickedPage);
    console.log("currentPage", currentPage);
    if (currentPage !== clickedPage) {
      console.log("insied first Loop");
      console.log(view);
      if (view === "Table View") {
        console.log(" view in Pagination", view);
        fetchTableData(searchItem, clickedPage, pageSize, view);
      } else {
        console.log(" view in Pagination", view);
        fetchCardData(searchItem, clickedPage, pageSize, view);
      }
      setCurrentPage(clickedPage);
    }
    return;
  };

  const axisselectChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.currentTarget.value);
    let value = event.currentTarget.value;
    setXaxis(value);
  };

  const pageSizeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const pageSize = parseInt(event.target.value, 10);
    let currentPage = 1
    if (view === "Table View") {
      console.log(" view in Pagination", view);
      fetchTableData(searchItem, 1, pageSize, view);
    } else {
      console.log(" view in Pagination", view);
      fetchCardData(searchItem, 1, pageSize, view);
    }
    setPageSize(pageSize);
    setCurrentPage(currentPage) ;


    console.log(pageSize);
  };
  const graphYearClickHandler = ( year : string) => {
    
    setGraphYear(year);
  };
  return (
    <div>
      <div className="container">
        <div className="search__company">
          <input
            className="search__inputField"
            type="text"
            placeholder="Search Company "
            value={searchItem}
            onChange={searchHandler}
          />
          <div className="autoSuggestion__container">
            {autoSuggest &&
              autoSuggest.length > 0 &&
              autoSuggest.map((data: string, index: number) => (
                <div
                  className="suggestion"
                  key={data}
                  id={data}
                  onClick={(event) => autosuggestHandler(event)}
                >
                  {data}{" "}
                </div>
              ))}
          </div>
        </div>

        <div className="position">
          {view === "Card View" ? (
            <Button
              clickHandler={TableClickHandler}
              id="Table View"
              label="Click for Table View"
              disabled={data && data.length > 0 ? false : true}
            />
          ) : (
            <Button
              clickHandler={CardClickHandler}
              id="Card View"
              label="Click for Card View"
            />
          )}
        </div>
      </div>

      <main className="main__section">
        <section style={{ margin: "1rem", marginRight: "2rem" }}>
          <div>
            {tableData && searchItem && (
              <div>
                <Table data={tableData} Headers={Constants.Headers} />
              </div>
            )}
            {view === "Card View" && searchItem && cardData}
            {(tableData || cardData) && (
              <div className="pagination__section">
                <Pagination
                  onPageChange={onPageChange}
                  currentPage={currentPage}
                />
                <select value={pageSize} onChange ={(event) => pageSizeChangeHandler(event)} >
                  { (Constants.Pagesize).map( (size : number) => <option value={size} >{ size}</option> )}
                </select>
              </div>
            )}
          </div>
        </section>
        <section style={{ margin: "1rem" }}>
          {(tableData || cardData) && (
            <div style={{ width: "120%", marginLeft: "2rem" }}>
              <label>Select Criteria</label>
              <select
                id="select"
                className="axis__style"
                value={xaxis}
                onChange={axisselectChangeHandler}
              >
                {Constants.Headers.filter((header) => header !== "Date").map(
                  (headers: string) => (
                    <option
                      style={{ width: "60%" }}
                      value={headers}
                      key={headers}
                    >
                      {headers}
                    </option>
                  )
                )}
              </select>
              <div style={{ textAlign: "left" }}>
                {Constants.Filter.map((year: string) => (
                  <button
                    className="year__selection"
                    key={year}
                    value="graphYear"
                    onClick={ ()=>graphYearClickHandler(year)}
                  >
                    {" "}
                    {year}
                  </button>
                ))}
              </div>
              {graphYear ? (
                <Chart data={data} header={xaxis} graphYear={graphYear} />
              ) : (
                <Chart data={data} header={xaxis} />
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Searchbar;
