import RoleSwitcher from "../components/RoleSwitcher";
import SummaryCards from "../components/SummaryCards";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";
import { transactions as initialData } from "../Data/mockData";
import Insights from "../components/Insights";
import AddTransaction from "../components/AddTransaction";
import { useState, useEffect,useRef} from "react";


export default function Dashboard() {
  const [role, setRole] = useState("viewer");   
  const [transactions, setTransactions] = useState(() => {
  const saved = localStorage.getItem("transactions");
  return saved ? JSON.parse(saved) : initialData;
});
  const [active, setActive] = useState("dashboard");
  const summaryRef = useRef(null);
const insightsRef = useRef(null);
const chartsRef = useRef(null);
const transactionsRef = useRef(null);

const scrollToSection = (ref,section) => {
  ref.current.scrollIntoView({ behavior: "smooth" });
  setActive(section);
};
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

  const addTransaction = (newTxn) => {
  setTransactions([...transactions, newTxn]);
};

  const deleteTransaction = (id) => {
  setTransactions(transactions.filter(t => t.id !== id));
};
return (
  <div className={darkMode ? "app dark" : "app"}>
    
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>💰 Finance</h2>
          <ul>
  <li
    className={active === "dashboard" ? "active" : ""}
    onClick={() => scrollToSection(summaryRef, "dashboard")}
  >
    Dashboard
  </li>

  <li
    className={active === "insights" ? "active" : ""}
    onClick={() => scrollToSection(insightsRef, "insights")}
  >
    Insights
  </li>

  <li
    className={active === "charts" ? "active" : ""}
    onClick={() => scrollToSection(chartsRef, "charts")}
  >
    Charts
  </li>

  <li
    className={active === "transactions" ? "active" : ""}
    onClick={() => scrollToSection(transactionsRef, "transactions")}
  >
    Transactions
  </li>
</ul>
      </div>

      {/* Main Content */}
      <div className="main">

        {/* Top bar */}
        <div className="top-bar">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>

          <RoleSwitcher role={role} setRole={setRole} />
        </div>

        <h1>Finance Dashboard</h1>

        <div ref={summaryRef} className="section fade-stagger delay-1">
  <SummaryCards transactions={transactions} />
</div>
        <div ref={chartsRef} className="section fade-stagger delay-3">
  <h2>Charts</h2>
  <Charts transactions={transactions} />
</div>
        {role === "admin" && (
          <div className="section">
            <AddTransaction addTransaction={addTransaction} />
          </div>
        )}

        <div ref={transactionsRef} className="section fade-stagger delay-4">
  <h2>Transactions</h2>
  <TransactionTable 
  transactions={transactions} 
  deleteTransaction={deleteTransaction} 
  role={role}
/>
</div>


        <div ref={insightsRef} className="section fade-stagger delay-2">
  <Insights transactions={transactions} />
</div>
      </div>
    </div>
  </div>
); ;
}