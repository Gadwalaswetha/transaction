import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css"; // Import CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [month, setMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Simulated API Data (Mock)
  useEffect(() => {
    const fakeTransactions = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Transaction ${i + 1}`,
      description: `Description for transaction ${i + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
    }));
    setTransactions(fakeTransactions);
    setFilteredTransactions(fakeTransactions);

    const fakeBarChartData = [
      { range: "$0-$100", count: Math.floor(Math.random() * 10) + 1 },
      { range: "$100-$200", count: Math.floor(Math.random() * 10) + 1 },
      { range: "$200-$300", count: Math.floor(Math.random() * 10) + 1 },
      { range: "$300-$400", count: Math.floor(Math.random() * 10) + 1 },
      { range: "$400-$500", count: Math.floor(Math.random() * 10) + 1 },
    ];
    setBarChartData(fakeBarChartData);
  }, [month]);

  // Search Filter
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (t) =>
          t.title.toLowerCase().includes(searchText.toLowerCase()) ||
          t.description.toLowerCase().includes(searchText.toLowerCase()) ||
          t.price.toString().includes(searchText)
      );
      setFilteredTransactions(filtered);
    }
  }, [searchText, transactions]);

  return (
    <div className="container">
      <h1>📊 Transactions Dashboard</h1>

      {/* Month Selector */}
      <label> Select Month: </label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search transactions..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>${t.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅️ Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next ➡️</button>
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h2>💰 Transactions Price Range</h2>
        {barChartData.length > 0 ? (
          <Bar
            data={{
              labels: barChartData.map((item) => item.range),
              datasets: [
                {
                  label: "Number of Items",
                  data: barChartData.map((item) => item.count),
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              animation: {
                duration: 1500,
                easing: "easeInOutBounce",
              },
            }}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default App;
