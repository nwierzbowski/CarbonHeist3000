import React from "react";
// import { useActivityContext } from "../../context/ActivityContext";
import { useGoalContext } from "../../context/GoalContext"; // Import GoalContext
// import { calculateCarbonByCategory } from "../dashboard/ActivitySummary"; // Assuming this is imported correctly
import { categoryColors } from "../../data/categories"; // Assuming category colors are defined here

const categories = categoryColors.map((val) => val.category); // Generate categories dynamically

export const Goals: React.FC = () => {
//   const { activities, selectedDate } = useActivityContext();
  const { categoryGoals, overallGoal, setCategoryGoal, setOverallGoal } = useGoalContext(); // Use GoalContext

  // Calculate progress dynamically
//   const progressByCategory = calculateCarbonByCategory(activities, categories, selectedDate);
//   const overallProgress = Object.values(progressByCategory).reduce((sum, value) => sum + value, 0);

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Set Your Daily Carbon Goals</h1>

      {/* Set Goals */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Category Goals</h2>
        {categories.map((category) => (
          <div key={category} className="mb-2 flex justify-between items-center">
            <label className="font-medium">{category}</label>
            <input
              type="number"
              min="0"
              value={categoryGoals[category] || 0} // Default to 0 if not set
              onChange={(e) => setCategoryGoal(category, Number(e.target.value))} // Update goal using context
              className="w-24 p-1 border rounded-md"
              placeholder="e.g., 5"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Overall Goal</h2>
        <input
          type="number"
          min="0"
          value={overallGoal} // Access overall goal from context
          onChange={(e) => setOverallGoal(Number(e.target.value))} // Update overall goal using context
          className="w-full p-2 border rounded-md"
          placeholder="Set your overall daily goal (e.g., 20 kg CO₂)"
        />
      </div>

      
    </div>
  );
};