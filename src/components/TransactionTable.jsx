import { useState } from "react";

export default function TransactionTable({ transactions, deleteTransaction, role }) {
  
  const [search, setSearch] = useState("");

  // 🔍 Simple search filter only
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

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