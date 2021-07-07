import * as React from "react";
import "./pagination.css";

interface LocalState {
  currentPage: number;
  prevPage: number;
  nextPage: number;
}
interface Props {
  onPageChange: (currentPage: number, stepValue: number) => void;
  currentPage: number;
  lastPage?: number;
}
export default class Pagination extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    const { currentPage } = this.props;
    this.state = {
      currentPage,
      prevPage: currentPage > 1 ? currentPage - 1 : 1,
      nextPage: currentPage > 1 ? currentPage + 1 : 3,
    };
  }
  onClickPrevNext = (currentPage: number, stepValue: number = 1) => {
    this.props.onPageChange(currentPage, stepValue);
    this.setState({
      prevPage: currentPage - 1,
      currentPage,
      nextPage: currentPage + 1,
    });
  };
  render() {
    const { currentPage, prevPage, nextPage } = this.state;
    const { lastPage } = this.props;
    const Prev = "<";
    const Next = ">";
    let end = currentPage * 10;
    let start = end - 9;

    return (
      <div className="containerPagination">
        <button
          className="items"
          style={{
            minWidth: "32px",
            border: "0.5px solid grey",
            borderRadius: "50%",
            backgroundColor: "whitesmoke",
          }}
          onClick={() => {
            if (currentPage === 2) {
              this.props.onPageChange(1, 1);
              this.setState({
                currentPage: 1,
                prevPage: 1,
                nextPage: 3,
              });
              return;
            }
            if (currentPage > 1) {
              this.onClickPrevNext(currentPage - 1);
            }
          }}
          disabled={currentPage === 1 ? true : false}
        >
          {Prev}
        </button>

        <button
          className={`items ${currentPage === prevPage ? "selected-item" : ""}`}
          onClick={() => {
            if (currentPage === 2) {
              this.props.onPageChange(1, 1);
              this.setState({
                currentPage: 1,
                prevPage: 1,
                nextPage: 3,
              });
              return;
            }
            if (currentPage > 1) {
              this.onClickPrevNext(currentPage - 1);
            }
          }}
        >
          {prevPage}
        </button>

        <button
          className={`items ${currentPage > prevPage ? "selected-item" : ""}`}
          onClick={() => {
            if (currentPage === 1) {
              this.onClickPrevNext(currentPage + 1);
            }
          }}
          disabled={lastPage ? currentPage > lastPage : false}
        >
          {currentPage === 1 ? currentPage + 1 : currentPage}
        </button>

        <button
          className="items"
          onClick={() => {
            if (currentPage === 1) {
              this.onClickPrevNext(currentPage + 2);
            } else {
              this.onClickPrevNext(currentPage + 1);
            }
          }}
          disabled={lastPage ? nextPage > lastPage : false}
        >
          {nextPage}
        </button>

        <button
          className="items"
          style={{ fontSize: "18px" }}
          onClick={() => {
            if (currentPage === 1) {
              this.onClickPrevNext(currentPage + 4, 4);
            } else {
              this.onClickPrevNext(currentPage + 3, 3);
            }
          }}
          disabled={lastPage ? currentPage + 3 > lastPage : false}
        >
          . . .
        </button>

        <button
          className="items"
          style={{
            minWidth: "32px",
            border: "0.5px solid grey",
            borderRadius: "50%",
            backgroundColor: "whitesmoke",
          }}
          onClick={() => {
            this.onClickPrevNext(currentPage + 1);
          }}
          disabled={lastPage ? nextPage > lastPage : false}
        >
          {" "}
          {Next}
        </button>
        {!(lastPage && currentPage > lastPage) && (
          <span className="items" style={{ minWidth: "150px" }}>
            {" "}
            Showing {start} - {end}{" "}
          </span>
        )}
      </div>
    );
  }
}