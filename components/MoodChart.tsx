"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MoodChart({ scores }: { scores: number[] }) {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Your Aura Trend",
        data: scores, // e.g., [3, 4, 2, 5, 4, 3, 5]
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { min: 1, max: 5, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">Weekly Wellbeing Progress</h3>
      <Line data={data} options={options} />
    </div>
  );
}