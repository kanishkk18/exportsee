import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const CustomRadialChart = ({ leadData = [] }) => {
  const activeLength = leadData.filter(lead => lead.leadStatus === "active").length;
  const pendingLength = leadData.filter(lead => lead.leadStatus === "pending").length;
  const soldLength = leadData.filter(lead => lead.leadStatus === "sold").length;

  const series = [activeLength, pendingLength, soldLength];
  const totalLeads = leadData.length;
  const scaledSeries = series.map(value => (totalLeads === 0 ? NaN : (value * 100) / totalLeads));

  const data = [
    { name: "Active", value: scaledSeries[0] },
    { name: "Pending", value: scaledSeries[1] },
    { name: "Sold", value: scaledSeries[2] },
  ];

  const COLORS = ["#25BE87", "#ECC94B", "#ff5959"];

  return (
    <div className="w-full max-w-md h-full mx-auto my-4 rounded-xl mb-4 shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-2">Lead Status Distribution</h2>
      <div className="relative my-auto">
        <PieChart width={330} height={320}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={-180}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label
              content={({ viewBox }) => {
                const { cx, cy } = viewBox;
                return (
                  <text x={cx} y={cy} fill="#1F7EEB" textAnchor="middle" dominantBaseline="central">
                    <tspan x={cx} y={cy} dy="-0.5em" fontSize="22px" fontWeight="bold">
                      {totalLeads}
                    </tspan>
                    <tspan x={cx} y={cy} dy="1.5em" fontSize="16px">
                      Total
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span className="text-sm">
              {entry.name}: {Math.round((entry.value / 100) * totalLeads)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomRadialChart;
