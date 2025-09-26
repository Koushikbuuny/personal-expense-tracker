import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import "./App.css";

// Import your profile image
import userImage from "./assets/myphoto.jpg";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define categories
const categories = ["Food", "Travel", "Bills", "Shopping", "Others"];

// Expense type
interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export default function App() {
  // User profile
  const userName = "Bheematati Koushik";
  const userPhoto = userImage;

  // State
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [filter, setFilter] = useState("All");

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add expense
  const handleAddExpense = () => {
    if (!title || !amount) return;
    setExpenses([
      ...expenses,
      { id: Date.now(), title, amount: Number(amount), category },
    ]);
    setTitle("");
    setAmount("");
    setCategory(categories[0]);
  };

  // Delete expense
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Filtered expenses
  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  // Summary totals
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  // Pie chart data
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: categories.map(
          (cat) =>
            expenses
              .filter((e) => e.category === cat)
              .reduce((acc, e) => acc + e.amount, 0)
        ),
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#f59e0b",
          "#10b981",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <div className="App">
      <div className="Card">
        {/* User Profile */}
        <div className="UserProfile">
          <img src={userPhoto} alt={userName} className="UserPhoto" />
          <span className="UserName">{userName}</span>
        </div>

        {/* Title */}
        <h1>Personal Expense Tracker</h1>

        {/* Form */}
        <div className="Form">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button onClick={handleAddExpense}>Add Expense</button>
        </div>

        {/* Filter */}
        <div className="Filter">
          <span>Filter by category: </span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div className="Summary">
          Total Expenses: ₹{totalExpenses.toLocaleString("en-IN")}
        </div>

        {/* Expense List */}
        <div className="ExpenseList">
          {filteredExpenses.map((e) => (
            <div key={e.id} className="ExpenseItem">
              <span>
                {e.title} ({e.category})
              </span>
              <span>₹{e.amount.toLocaleString("en-IN")}</span>
              <div className="Buttons">
                <button onClick={() => handleDelete(e.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="Chart">
          <h2>Category-wise Breakdown</h2>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
}
