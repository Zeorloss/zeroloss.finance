import { Link } from "gatsby";
import React, { Component } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, LabelList, ResponsiveContainer } from "recharts";


class InfoChart extends Component {
  render() {
    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
   const pieData = [
      {
         name: "ZEROLOSS Ecosystem",
         value: 50
      },
      {
         name: "Early Access",
         value: 11.72
      },
      {
         name: "Development",
         value: 9
      },
      {
         name: "Marketing",
         value: 10.28
      },
      {
         name: "Team",
         value: 8
      },
      {
        name: "Treasury",
        value: 11
      }
   ];

   const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
       return (
       <div
          className="custom-tooltip"
          style={{
             backgroundColor: "#ffff",
             padding: "5px",
            //  border: "1px solid #cccc"
          }}
       >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
       </div>
    );
 }
 return null;
};
    


    return (
      <div className="bg-white" >
        <h1
          style={{ textAlign: "center"}}
          className="text-3xl md:text-5xl"
        >
          ZEROLOSS TOKENOMICS
        </h1>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart   >
        <Pie
          data={pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          isAnimationActive="true"
        >
          {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
          ))}

          <LabelList stroke="#000" offset={-20} dataKey="name" position="outside" />
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
          </PieChart>
      </ResponsiveContainer>

      <div className="text-center px-6 font-normal">
        <p>zDAO will be minted as token to secure the ZEROLOSS DAO </p>
        <p>A fixed amount of ZLT will be voted for and burnt to mint zDAO,
             this will ensure the sustainable interoperability of ZEROLOSS 
             with stable coins and BNB. Read our white paper <a download href='/litepaper.pdf'><span className="text-blue-900 font-bold">here</span></a></p>
        <p>ZEROLOSS is the utility and dApp, ZLT is the currency </p> 
        <p>For more information about ZEROLOSS send us an email <Link to='mailto:teammarketing@zeroloss.finance'><span className="text-blue-900 font-bold">here</span></Link> or chat with our team on discord <Link to="https://discord.gg/brUDkCb72M"><span className="text-blue-900 font-bold">here</span></Link></p>
      </div>
      </div>
    );
  }
}

export default InfoChart;
