"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Compliant", value: 98.4 },
  { name: "Remaining", value: 1.6 },
];

const COLORS = ["hsl(var(--primary))", "rgba(255, 255, 255, 0.1)"];

export function SLAGaugeChart() {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}