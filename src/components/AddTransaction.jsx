import { useState } from "react";

export default function AddTransaction({ addTransaction }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    addTransaction(newTransaction);

    // reset form
    setForm({
      date: "",
      amount: "",
      category: "",
      type: "expense",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="category" type="text" placeholder="Category" value={form.category} onChange={handleChange} required />

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}