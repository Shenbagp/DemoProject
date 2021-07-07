import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { format, parseISO, subDays } from "date-fns";
import { companyDetails } from "../../Model/company-details";
import moment from "moment";
import { trim } from "lodash";
interface Props {
  data: companyDetails[];
  header: string;
  graphYear ?: string;
}

const Chart: React.FC<Props> = (props: Props) => {
  let processData = props.data;
  let data;
  console.log(props.graphYear)
  console.log(props.header);
  let daterange : any;
  if (props.graphYear) {
    daterange=props.graphYear.trim().split("")[1] === "M"
      ?  moment().subtract(props.graphYear.trim().split("")[0], "months")
      :  moment().subtract(props.graphYear.trim().split("")[0], "years");
      console.log('daterange' , daterange)
      processData = processData.filter( data => 
        moment(data.Date) > daterange )       

  }  
     console.log ( "check ", moment().subtract(5, "months"))
    console.log(daterange)
    console.log("processData" , processData) ;
    data = processData.map((item: any) => ({
       
      date: item.Date,
      values: item[props.header],
    }));
  
 console.log( "###" , data)
  return (
    <div>
      <ResponsiveContainer width="65%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="values" stroke="#2451B7" fill="url(#color)" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 7 === 0) {
                return format(date, "MMM, d");
              }
              return "";
            }}
          />

          <YAxis
            dataKey="values"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            domain= {[90, 120 ]}
          />

          <Tooltip />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;

//X-axis

// y-axis
//
