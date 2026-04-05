import { LineChart, Line, PieChart, Pie } from "recharts";
import { transactions } from "../Data/mockData";

export default function Charts() {
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <LineChart width={300} height={200} data={transactions}>
        <Line dataKey="amount" stroke="#8884d8" />
      </LineChart>

      <PieChart width={300} height={200}>
        <Pie data={transactions} dataKey="amount" nameKey="category" />
      </PieChart>
    </div>
  );
}