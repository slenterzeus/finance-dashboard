import { transactions } from "../Data/mockData";
import "./SummaryCards.css";

export default function SummaryCards() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="cards">
  <div className="card income">Income: ₹{income}</div>
  <div className="card expense">Expense: ₹{expense}</div>
  <div className="card balance">Balance: ₹{balance}</div>
</div>
  );
}