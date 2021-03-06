import { useEffect, useState, useCallback } from "react";
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
    fetchTableData(initialData, 1, pageSize, "Card View");
  }, []);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchItem = event.target.value;
    const resetPage = 1 ; 
    setSearchItem(searchItem);
    setData([]);
    setTableData("");
    setCardData("");
    setAutoSugest([]);
    setCurrentPage(resetPage)
    searchItem = event.target.value;
    searchItem && debounceSearch(searchItem);
  };

  const debounceSearch = useCallback(
    _.debounce((value: string) => searchCompanyList(value), 100),
    []
  );

  const searchCompanyList = (searchItem: string) => {
    ListService.companyService(searchItem).then((res: Array<string>) => {
      const autoSuggest = res;
      autoSuggest && setAutoSugest(autoSuggest);
    });
  };

  const autosuggestHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const value = event.currentTarget.id;
    setAutoSugest([]);
    setSearchItem(value);
  };

  const TableClickHandler = (id: string) => {
    //setTableData("");
    //setCardData("");
    console.log(view)
    console.log("Table CLick Handler",id)
    setView(id);
    
    (!( tableData && tableData.length > 0))  && fetchTableData(searchItem, currentPage, pageSize, "Card View");
  };
  const CardClickHandler = (id: string) => {
    //setTableData("");
    //setCardData("");
    console.log("card Click Handler ---" , id)
    setView(id);
    setCurrentPage(currentPage);
    
    ( !(cardData && cardData.length > 0) )  && fetchCardData(searchItem, currentPage, pageSize, "Table View");
  };

  const fetchCardData = (
    searchItem: string,
    clickedPage: number,
    pageSize: number,
    id: string
  ) => {
    let cardData_: any = [];      
    FetchService.fetchRecords(searchItem, clickedPage, pageSize).then(
      (res: companyServiceResponse) => {
        console.log("Fetching new sets of data ")
        if (res.data && res.data.length ) {
          cardData_ = res.data.map((item: companyDetails) => {
            return (
              <Card key={item._id}>
                <div className="card__container">
                  <div className="card__display">
                    <span>
                      {" "}
                      <label className="table__label">Date</label> :
                      {moment(item.Date).format("MMM DD yyyy")}
                    </span>
                    <span>
                      {" "}
                      <label className="table__label"> Open</label> :
                      {item.Open.toFixed(2)}
                    </span>
                    <span>
                      {" "}
                      <label className="table__label"> High </label> :
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
                      <label className="table__label">Volume</label> :
                      {item.Volume.toFixed(2)}
                    </span>
                    <span>
                      <label className="table__label">Close</label> :
                      {item.Close.toFixed(2)}
                    </span>
                    <span>
                      <label className="table__label">Low</label> :
                      {item.Low.toFixed(2)}
                    </span>
                    <span>
                      <label className="table__label">Company</label> :
                      {item.Company}
                    </span>
                  </div>
                </div>
              </Card>
            );
          });
          setCardData(cardData_);
          setData(res.data);          
          setCurrentPage(clickedPage)
        }
      }
    );
  };

  const fetchTableData = (
    searchItem: string,
    clickedPage: number,
    pageSize: number,
    id: string
  ) => {
    let data_: any = "";   
      console.log("No Data for Table View")
      FetchService.fetchRecords(searchItem, clickedPage, pageSize).then(      
        (res: companyServiceResponse) => {
          console.log("received Data")
          if (res.data && res.data.length) {
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
        }
        setTableData(data_);
        setData(res.data);
        setCurrentPage(clickedPage)
      }
    );
  };

  const onPageChange = (clickedPage: number) => {
    console.log('OnPage Change');
    console.log(clickedPage , currentPage)    
    if (currentPage !== clickedPage) {      
      if (view === "Table View") {       
        
        fetchTableData(searchItem, clickedPage, pageSize, view);
      } else {
        
        fetchCardData(searchItem, clickedPage, pageSize, view);
      }
      
    }
    return;
  };

  const axisselectChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let value = event.currentTarget.value;
    setXaxis(value);
  };

  const pageSizeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const pageSize = parseInt(event.target.value, 10);
    let currentPage = 1;
    if (view === "Table View") {
      fetchTableData(searchItem, 1, pageSize, view);
    } else {
      fetchCardData(searchItem, 1, pageSize, view);
    }
    setPageSize(pageSize);
    setCurrentPage(currentPage);
  };
  const graphYearClickHandler = (year: string) => {
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

        <div className="position__button">
          {view === "Card View" ? (
            <Button
              clickHandler={TableClickHandler}
              id="Table View"
              label="Click for Table View"              
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
            {tableData && searchItem &&  view === "Table View" &&  (
              <div>
                <Table data={tableData} Headers={Constants.Headers} />
              </div>
            )}
            { view === "Card View" && searchItem && cardData  }
            {(tableData || cardData) && (
              <div className="pagination__section">
                <Pagination
                  onPageChange={onPageChange}
                  currentPage={currentPage}
                />
                <select
                  value={pageSize}
                  onChange={(event) => pageSizeChangeHandler(event)}
                >
                  {Constants.Pagesize.map((size: number) => (
                    <option value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>
        <section style={{ margin: "1rem" }}>
          {(tableData  || cardData) && (
            <div style={{ width: "120%", marginLeft: "2rem" }}>
              <label>Select Criteria</label>
              <select
                id="select"
                className="axis__style"
                value={xaxis}
                onChange={axisselectChangeHandler}
              >
                {Constants.Grapheaders.filter((header) => header !== "Date").map(
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
                    onClick={() => graphYearClickHandler(year)}
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
