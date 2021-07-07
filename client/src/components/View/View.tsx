import React , {useState} from "react";
import "./View.css";
import * as service from "./../../Service/Company-Records-service";
import Table from "../../Shared/Table/Table"
import {companyDetails} from "./../../Model/company-details"
import * as Constants from "./../../constant"

interface Props {
  searchItem : string; 
  initialValue :companyDetails[];
  refresh : string ;
}
const View:React.FC<Props> = ( props:Props) => {
   const [tableView, setTableView] = useState([] as companyDetails[])
   const [refresh , setRefresh]  = useState(props.refresh);
   const [data , setData] = useState("")
  const {searchItem} = props ; 
  let data_ : any = undefined ; 
  
  const clicked = (event: any) => {
        const view = event.target.id ;
         service.fetchRecords( searchItem, 10, 5)
            .then ((res:companyDetails[]) => {
              console.log("Inside View Component-" , res);
              if ( res && res.length && view === "tableView") {
                 setTableView(res);
                 data_ = tableView.map((item:companyDetails , index : number)=>(
                  <>
                      <td key={item._id}>{item.Date}</td>
                      <td key={(item.Open)} >{(item.Open).toFixed(3)}</td>
                      <td key={(item.High)}>{(item.High).toFixed(3)}</td>
                      <td key={item.Low}>{(item.Low).toFixed(3)}</td>
                      <td key={item.Close}>{(item.Close).toFixed(3)}</td>
                      <td key={item.AdjClose} >{(item.AdjClose).toFixed(3)}</td>
                      <td key={item.Volume} >{(item.Volume).toFixed(3)}</td>
                      <td key={item.Company+index}>{item.Company}</td>
                    </>
                  ))
                  setTableView(res);
                  setData(data_)
                  console.log("data_",data_)
              }
              else {
                 
              }
            })          
      }
      console.log("data -" , data )
  
    
  return (
    <div className="position">
      <button onClick={(event)=>clicked(event)} id="tableView" className="buttonclass">
        {" "}
        Table View
      </button>
      <button onClick={clicked} id= "cardView" className="buttonclass">
        {" "}
       Card View
      </button>
       
    </div>
  );
}

export default View;
{/* <div style={{marginTop:"100px"}}>
          { tableView &&  tableView.length > 0 && <div><Table data= {data} headers ={Constants.Headers} /> </div> }
        </div> */}