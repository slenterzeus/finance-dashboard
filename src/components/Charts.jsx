import { LineChart, Line, PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { transactions } from "../Data/mockData";

export default function Charts() {
  return (
    <div style={{ display: "flex", gap: "30px" }}>

      
      <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "10px" }}>
          Spending Trend Over Time
        </h3>

        <LineChart width={300} height={200} data={transactions}>
          <Line dataKey="amount" stroke="#8884d8" name="Amount" />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>

      
      <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "10px" }}>
          Category-wise Spending
        </h3>

        <PieChart width={300} height={200}>
          <Pie
            data={transactions}
            dataKey="amount"
            nameKey="category"
            label   // 🔥 THIS SHOWS "Food", "Salary" etc
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

    </div>
  );
}