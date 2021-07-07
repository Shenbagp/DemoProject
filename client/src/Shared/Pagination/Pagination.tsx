import React, { useState } from "react";
import "./Pagination.css";


interface Props {
    onPageChange: (currentPage: number ) => void;
    currentPage: number;
    lastPage?: number;
}

export const Pagination: React.FC<Props> = (props: Props) => {

    const [PrevPage, setPrevPage] = useState(props.currentPage > 1 ? props.currentPage - 1 : 1);
    const [NextPage, setNextPage] = useState(props.currentPage > 1 ? props.currentPage + 1 : 3,);
    const [CurrentPage, setCurrentPage] = useState(props.currentPage);

    const Prev = "<";
    const Next = ">";
    let end = CurrentPage * 10;
    let start = end - 9;



    const onClickPrevNext = (currentPage: number ) => {
        props.onPageChange(currentPage );
        setPrevPage(currentPage - 1);
        setNextPage(currentPage + 1)
        setCurrentPage(currentPage);

    };
    return (<div style={{marginLeft:"5rem"}}>

        <button
            className="items"
            style={{
                minWidth: "32px",
                border: "0.5px solid grey",
                borderRadius: "50%",
                backgroundColor: "whitesmoke",
            }}
            disabled={CurrentPage === 1 ? true : false}
            onClick={() => {
                if (CurrentPage === 2) {
                    props.onPageChange(1);
                    setCurrentPage(1);
                    setPrevPage(1)
                    setNextPage(3)
                    return;
                }
                if (CurrentPage > 1 ) {
                    onClickPrevNext(CurrentPage - 1);
                }
            }}
            
        >
            {Prev}
        </button>
        <button
            className={`items ${CurrentPage === PrevPage ? "selected-item" : ""}`}
            onClick={() => {
                if (CurrentPage === 2) {
                    props.onPageChange(1);

                    setCurrentPage(1);
                    setPrevPage(1)
                    setNextPage(3)
                    return;
                }
                if (CurrentPage > 1 && CurrentPage !== 2) {
                    onClickPrevNext(CurrentPage - 1);
                }
            }}
        >
            {PrevPage}
        </button>

        <button
            className={`items ${CurrentPage > PrevPage ? "selected-item" : ""}`}
            onClick={() => {
                if (CurrentPage === 1) {
                    onClickPrevNext(CurrentPage + 1);
                }
            }}
            disabled={props.lastPage ? CurrentPage > props.lastPage : false}
        >
            {CurrentPage === 1 ? CurrentPage + 1 : CurrentPage}
        </button>

        <button
            className="items"
            onClick={() => {
                if (CurrentPage === 1) {
                    onClickPrevNext(CurrentPage + 2);
                } else {
                    onClickPrevNext(CurrentPage + 1);
                }
            }}
            disabled={props.lastPage ? NextPage > props.lastPage : false}
        >
            {NextPage}
        </button>
        <button
            className="items"
            style={{ fontSize: "18px" }}
            onClick={() => {
                if (CurrentPage === 1) {
                    onClickPrevNext(CurrentPage + 4,);
                } else {
                    onClickPrevNext(CurrentPage + 3,);
                }
            }}
            disabled={props.lastPage ? CurrentPage + 3 > props.lastPage : false}
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
                onClickPrevNext(CurrentPage + 1);
            }}
            disabled={props.lastPage ? NextPage > props.lastPage : false}
        >
            {" "}
            {Next}
        </button>
        {!(props.lastPage && CurrentPage > props.lastPage) && (
            <span className="items" style={{ minWidth: "150px" }}>
                {" "}
                Showing {start} - {end}{" "}
            </span>
        )}

    </div>);
}

export default Pagination;


