import { useState } from "react";

export default function TransactionTable({ transactions, deleteTransaction, role }) {
  
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    return (
      (typeFilter === "all" || tx.type === typeFilter) &&
      (categoryFilter === "all" || tx.category === categoryFilter)
    );
  });


  // 🔍 Simple search filter only
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div>


      {/* 🔽 FILTER UI */}
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {/* 🔽 DATA RENDER */}
      {filteredTransactions.map((tx) => (
        <div key={tx.id}>
          {tx.category} - {tx.amount}
        </div>
      ))}

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

      <table className="table" border="1" width="100%" cellPadding="10">
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