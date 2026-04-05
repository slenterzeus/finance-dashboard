

export default function Insights({transactions}) {
  // 🔹 Highest spending category
  const expenseTransactions = transactions.filter(t => t.type === "expense");

  const categoryTotals = {};

  expenseTransactions.forEach(t => {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) + t.amount;
  });

  let highestCategory = "";
  let maxAmount = 0;

  for (let category in categoryTotals) {
    if (categoryTotals[category] > maxAmount) {
      maxAmount = categoryTotals[category];
      highestCategory = category;
    }
  }

  // 🔹 Total income & expense
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Insights</h2>

      <p>Highest Spending Category: {highestCategory}</p>
      <p>Total Income: ₹{income}</p>
      <p>Total Expense: ₹{expense}</p>
    </div>
  );
}