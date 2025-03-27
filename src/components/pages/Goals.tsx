import React from "react";
import { useGoalContext } from "../../context/GoalContext"; // Import GoalContext
import { categoryColors } from "../../data/categories"; // Assuming category colors are defined here
import Header from "../general/Header";
import Card from "../general/Card";
import Title from "../general/Title";

const categories = categoryColors.map((val) => val.category); // Generate categories dynamically

export const Goals: React.FC = () => {
  const { categoryGoals, overallGoal, setCategoryGoal, setOverallGoal } = useGoalContext(); // Use GoalContext

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <Header>Set Your Daily Carbon Goals</Header>

      <p className="text-gray-700 mb-6">
        Define your goals to reduce your carbon footprint across different categories and track your progress.
      </p>

      {/* Category Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category}>
            <Title>{category}</Title>
            <input
              type="number"
              min="0"
              value={categoryGoals[category] || 0} // Default to 0 if not set
              onChange={(e) => setCategoryGoal(category, Number(e.target.value))} // Update goal using context
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              placeholder={`Set goal for ${category}`}
            />
          </Card>
        ))}
      </div>

      {/* Overall Goal */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Overall Goal</h2>
        <input
          type="number"
          min="0"
          value={overallGoal} // Access overall goal from context
          onChange={(e) => setOverallGoal(Number(e.target.value))} // Update overall goal using context
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Set your overall daily goal (e.g., 20 kg CO₂)"
        />
      </div>
    </div>
  );
};