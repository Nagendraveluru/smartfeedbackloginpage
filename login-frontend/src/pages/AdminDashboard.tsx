// AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  LineChart,
  Line,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./AdminDashboard.css"; // ⬅️ Custom CSS
import Navbar from "../components/Navbar";

type Feedback = {
  username: string;
  message: string;
  submittedAt: string;
};

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AA66CC", "#33B5E5"];

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  useEffect(() => {
    axios
      .get("http://localhost:5072/api/feedback/all")
      .then((res) => setFeedbacks(res.data))
      .catch(() => {});
  }, []);

  const grouped: Record<string, number> = feedbacks.reduce((acc, item) => {
    acc[item.username] = (acc[item.username] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(grouped).map(([username, value]) => ({
    name: username,
    value,
  }));

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Username", "Message", "Date"];
    const tableRows = feedbacks.map((fb: Feedback) => [
      fb.username,
      fb.message,
      new Date(fb.submittedAt).toLocaleString(),
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("feedbacks.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(feedbacks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Feedbacks");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "feedbacks.xlsx");
  };

  return (
    <>
      <Navbar />
    
    <div className="admin-dashboard">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>
      <p className="dashboard-count">
        Total Feedbacks: <strong>{feedbacks.length}</strong>
      </p>

      <div className="dashboard-actions">
        <button className="btn export-btn" onClick={exportPDF}>
          📄 Export PDF
        </button>
        <button className="btn export-btn" onClick={exportExcel}>
          📊 Export Excel
        </button>
        <button
          className="btn toggle-btn"
          onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}
        >
          Toggle to {chartType === "bar" ? "Line" : "Bar"} Chart
        </button>
      </div>

      <div className="chart-container">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <h3 className="chart-title">🎯 Pie Chart Summary</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </>
  );
};

export default AdminDashboard;
