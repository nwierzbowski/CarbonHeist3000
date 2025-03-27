import React from "react";
import { Line, Pie } from "react-chartjs-2"; // Import Line and Pie charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ActivityItem, useActivityContext } from "../../context/ActivityContext";
import { useGoalContext } from "../../context/GoalContext";
import { categoryColors} from "../../data/categories"; // Import category colors and helper function

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// Helper function to extract data for the charts with sorted dates
const extractChartData = (activities: Record<string, ActivityItem[]>, categoryGoals: Record<string, number>) => {
    const dates = Object.keys(activities).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Sort dates chronologically
    const categoryData: Record<string, number[]> = {};
  
    // Initialize category data arrays based on category goals
    Object.keys(categoryGoals).forEach((category) => {
      categoryData[category] = [];
    });
  
    // Extract category trends over time
    dates.forEach((date) => {
      const dailyActivities = activities[date] || [];
      const dailyCategoryTotals: Record<string, number> = {};
  
      // Sum carbon values by category for the current date
      dailyActivities.forEach((activity) => {
        const category = activity.category;
        const carbonValue = parseFloat(activity.carbon_value) * activity.amount;
        if (!isNaN(carbonValue)) {
          dailyCategoryTotals[category] = (dailyCategoryTotals[category] || 0) + carbonValue;
        }
      });
  
      // Push totals to category data arrays in chronological order
      Object.keys(categoryGoals).forEach((category) => {
        categoryData[category].push(dailyCategoryTotals[category] || 0); // Default to 0 if no data for the category
      });
    });
  
    // Calculate overall totals per day in chronological order
    const overallData = dates.map((date) => {
      const dailyActivities = activities[date] || [];
      return dailyActivities.reduce((sum, activity) => {
        const carbonValue = parseFloat(activity.carbon_value) * activity.amount;
        return sum + (isNaN(carbonValue) ? 0 : carbonValue);
      }, 0);
    });
  
    return { dates, categoryData, overallData };
  };
  

  export const CarbonFootprintDashboard: React.FC = () => {
    const { activities, selectedDate } = useActivityContext();
    const { categoryGoals } = useGoalContext();
  
    // Extract and sort data for visualization
    const { dates, categoryData, overallData } = extractChartData(activities, categoryGoals);
  
    // Map Tailwind classes to actual hex values for accurate chart rendering
    const colorMap = categoryColors.reduce<Record<string, string>>((map, item) => {
      const hexColors: Record<string, string> = {
        "bg-green-500": "#22c55e",
        "bg-blue-500": "#3b82f6",
        "bg-yellow-500": "#eab308",
        "bg-orange-500": "#f97316",
        "bg-purple-500": "#a855f7",
        "bg-indigo-500": "#6366f1",
        "bg-teal-500": "#14b8a6",
        "bg-amber-500": "#f59e0b",
        "bg-pink-500": "#ec4899",
        "bg-gray-500": "#6b7280",
      };
      map[item.category] = hexColors[item.colorClass];
      return map;
    }, {});
  
    // Line chart for categories
    const categoryDataset = Object.keys(categoryData).map((category) => ({
      label: category,
      data: categoryData[category],
      borderColor: colorMap[category],
      backgroundColor: colorMap[category],
      tension: 0.4,
      fill: false,
    }));
  
    // Line chart for overall footprint trends
    const overallDataset = {
      label: "Overall Carbon Footprint",
      data: overallData,
      borderColor: "#4caf50",
      backgroundColor: "#4caf50",
      tension: 0.4,
      fill: false,
    };
  
    // Pie chart data (aggregated by category for the selected date)
    const selectedDateActivities = activities[selectedDate] || [];
    const pieData = selectedDateActivities.reduce(
      (acc, activity) => {
        const category = activity.category;
        const carbonValue = parseFloat(activity.carbon_value) * activity.amount;
  
        if (!isNaN(carbonValue)) {
          if (!acc.categories[category]) {
            acc.categories[category] = 0;
            acc.colors.push(colorMap[category]);
            acc.labels.push(category);
          }
          acc.categories[category] += carbonValue;
        }
  
        return acc;
      },
      {
        categories: {} as Record<string, number>,
        labels: [] as string[],
        colors: [] as string[],
      }
    );
  
    const pieChartData = {
      labels: pieData.labels,
      datasets: [
        {
          data: pieData.labels.map((label) => pieData.categories[label]),
          backgroundColor: pieData.colors,
        },
      ],
    };
  
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-10 md:gap-10">
        {/* Responsive Chart Heights */}
        <div className="h-[50vh] md:h-[40vh] lg:h-[30vh]">
          <h2 className="text-xl font-semibold mb-4">Category Trends</h2>
          <Line
            data={{
              labels: dates,
              datasets: categoryDataset,
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Carbon Footprint by Category Over Time" },
              },
            }}
          />
        </div>
  
        <div className="h-[50vh] md:h-[40vh] lg:h-[30vh]">
          <h2 className="text-xl font-semibold mb-4">Category Distribution (Selected Date)</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: `Carbon Footprint Distribution for ${selectedDate}` },
              },
            }}
          />
        </div>
  
        <div className="h-[50vh] md:h-[40vh] lg:h-[30vh]">
          <h2 className="text-xl font-semibold mb-4">Overall Trend</h2>
          <Line
            data={{
              labels: dates,
              datasets: [overallDataset],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Overall Carbon Footprint Over Time" },
              },
            }}
          />
        </div>
  
        <div className="h-[50vh] md:h-[40vh] lg:h-[30vh] overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Summary View</h2>
          <div className="text-gray-700">
            <p>
              <strong>Total Dates Tracked:</strong> {dates.length}
            </p>
            <p>
              <strong>Selected Date:</strong> {selectedDate}
            </p>
            <p>
              <strong>Overall Footprint:</strong> {overallData[dates.indexOf(selectedDate)] || 0} kg CO₂
            </p>
          </div>
        </div>
      </div>
    );
  };