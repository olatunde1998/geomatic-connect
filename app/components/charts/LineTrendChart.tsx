"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineTrendChart({ data }: { data: any[] }) {
  return (
    <div
      className="my-6 dark:invert"
      style={{
        width: "100%",
        height: 300,
        padding: "10px",
        borderWidth: "1px",
        borderColor: "#E5E7EB",
        borderStyle: "solid",
        borderRadius: "8px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 2,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={7}
            domain={[0, 20]}
            dx={-10}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalApplication"
            stroke="#33A852"
            strokeWidth={1.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            name="Total Application"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
