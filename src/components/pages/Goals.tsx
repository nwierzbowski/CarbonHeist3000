import React, { useState } from "react";
import { useActivityContext } from "../../context/ActivityContext";
import { calculateCarbonByCategory } from "../dashboard/ActivitySummary";
import { categoryColors } from "../../data/categories";
// import { calculateCarbonByCategory } from "../../utils/calculateCarbonByCategory";

const categories = categoryColors.map(val => val.category); // Add your own categories

export const Goals: React.FC = () => {
  const { activities, selectedDate } = useActivityContext();

  // State for goals and progress
  const [categoryGoals, setCategoryGoals] = useState<Record<string, number>>(
    categories.reduce((acc, category) => {
      acc[category] = 0; // Initialize goals for each category to 0
      return acc;
    }, {} as Record<string, number>)
  );

  const [overallGoal, setOverallGoal] = useState<number>(0); // Total daily goal
  const [feedback, setFeedback] = useState<string>(""); // Motivational feedback

  // Calculate progress dynamically
  const progressByCategory = calculateCarbonByCategory(activities, categories, selectedDate);
  const overallProgress = Object.values(progressByCategory).reduce((sum, value) => sum + value, 0);

  // Handle goal updates
  const handleCategoryGoalChange = (category: string, goal: number) => {
    setCategoryGoals((prev) => ({
      ...prev,
      [category]: goal,
    }));
  };

  const handleOverallGoalChange = (goal: number) => {
    setOverallGoal(goal);
  };

  // Generate feedback dynamically
  const getMotivationalFeedback = () => {
    if (overallProgress >= overallGoal && overallGoal > 0) {
      return "Congratulations! You've achieved your overall goal for today. Keep it up! 🎉";
    } else if (overallProgress > overallGoal * 0.75) {
      return "You're so close to reaching your daily goal! Great work! 🌟";
    } else if (overallProgress > overallGoal * 0.5) {
      return "Halfway there! Keep making progress. 💪";
    } else if (overallProgress > overallGoal * 0.25) {
      return "Good start! Stay consistent, and you'll reach your goal. 🌱";
    } else {
      return "Every effort counts! Let's keep going! 🌍";
    }
  };

  // Update feedback on progress
  React.useEffect(() => {
    setFeedback(getMotivationalFeedback());
  }, [overallProgress, overallGoal]);

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
              value={categoryGoals[category]}
              onChange={(e) => handleCategoryGoalChange(category, Number(e.target.value))}
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
          value={overallGoal}
          onChange={(e) => handleOverallGoalChange(Number(e.target.value))}
          className="w-full p-2 border rounded-md"
          placeholder="Set your overall daily goal (e.g., 20 kg CO₂)"
        />
      </div>

      {/* Motivational Feedback */}
      {feedback && (
        <p className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          {feedback}
        </p>
      )}
    </div>
  );
};