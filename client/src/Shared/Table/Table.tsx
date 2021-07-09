import React from 'react' ;
import {companyDetails} from "./../../Model/company-details" ;
import "./Table.css";
 
interface Props {
    data : string ;
    Headers : Array<string>
}

const Table:React.FC<Props> = (props:Props) => {
    const {data , Headers } = props
   
    return (
        <div className="table__container">
            <table>
                <thead>
                    <tr>                        
                        {Headers && Headers.length > 0 && Headers.map( ( data: string )=> <th key={data} > {data}</th>)}
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </table>
        </div>
    )
}

export default Table;
