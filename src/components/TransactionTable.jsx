const [search, setSearch] = useState("");
const [typeFilter, setTypeFilter] = useState("all");
const [categoryFilter, setCategoryFilter] = useState("all");
import { useState } from "react";
import { transactions } from "../Data/mockData";

export default function TransactionTable({transactions,deleteTransaction,role}) {
  const [search, setSearch] = useState("");

  // 🔍 Filter logic
  const filtered = transactions.filter((t) => {
  const matchesSearch =
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase());

  const matchesType =
    typeFilter === "all" || t.type === typeFilter;

  const matchesCategory =
    categoryFilter === "all" || t.category === categoryFilter;

  return matchesSearch && matchesType && matchesCategory;
});

  return (
    <div>
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%"
        }}
      />

        <div style={{ marginBottom: "10px" }}>
  <input
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select onChange={(e) => setTypeFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

  <select onChange={(e) => setCategoryFilter(e.target.value)}>
    <option value="all">All Categories</option>
    <option value="Food">Food</option>
    <option value="Shopping">Shopping</option>
    <option value="Salary">Salary</option>
  </select>
</div>

      <table  className="table" border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>

              {role === "admin" && (
    <td>
      <button
  onClick={() => {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(t.id);
    }
  }}
>
  Delete
</button>
    </td>
  )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}