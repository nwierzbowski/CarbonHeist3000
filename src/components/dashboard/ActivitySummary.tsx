import { ActivityItem, useActivityContext } from "../../context/ActivityContext";
import { useGoalContext } from "../../context/GoalContext"; // Import GoalContext
import { categoryColors, getCategoryColorClass } from "../../data/categories";
import ProgressBar from "./ProgressBar";

// Function to calculate carbon values by category
export function calculateCarbonByCategory(
  options: Record<string, ActivityItem[]>, // Updated type to reflect the structure
  allCategories: string[],
  selectedDate: string // Add selectedDate as a parameter
): Record<string, number> {
  // Initialize the summary object with all categories set to 0
  const summary = allCategories.reduce((accumulator, category) => {
    accumulator[category] = 0;
    return accumulator;
  }, {} as Record<string, number>);

  // Get activities for the selected date
  const activities = options[selectedDate] || []; // Default to an empty array if no activities for the date

  // Iterate over the activities for the selected date
  activities.forEach((activity) => {
    const category = activity.category;
    const carbonValue = parseFloat(activity.carbon_value) * activity.amount; // Calculate the total carbon value
    if (!isNaN(carbonValue)) {
      summary[category] += carbonValue; // Add the carbon value to the corresponding category
    }
  });

  return summary;
}

export default function ActivitySummary() {
  const { activities, selectedDate } = useActivityContext();
  const { categoryGoals } = useGoalContext(); // Use GoalContext for category goals

  const summary = Object.entries(
    calculateCarbonByCategory(activities, categoryColors.map((item) => item.category), selectedDate)
  );

  // Generate feedback based on staying under goals
  const generateFeedback = (category: string, carbonValue: number): string => {
    const goal = categoryGoals[category] || 0; // Get the goal for the category, default to 0 if not set
  
    if (carbonValue === 0) {
      return `Outstanding! You've achieved zero emissions for ${category}. This is the ultimate goal! 🌍✨`;
    } else if (carbonValue < goal * 0.25) {
      return `Fantastic job on keeping ${category} emissions very low! Let's aim to stay here or go even lower. 🌱`;
    } else if (carbonValue < goal * 0.5) {
      return `Good progress in keeping ${category} emissions low, but there's room for improvement. Every effort matters! 💪`;
    } else if (carbonValue < goal * 0.75) {
      return `You're getting closer to the ${category} goal. Keep pushing to reduce emissions further! 🌟`;
    } else if (carbonValue < goal) {
      return `You're nearing the goal for ${category}. Let's work on keeping emissions as low as possible! 🚀`;
    } else if (carbonValue === goal) {
      return `You've reached the goal for ${category}, but don't stop now. Lower emissions are always better! 🎉`;
    } else {
      return `You've exceeded the goal for ${category}. That's okay—let's focus on cutting back tomorrow. 🌍`;
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <p className="text-gray-700 mb-6">
        Here you can view a summary of your activities and their impact on the
        environment.
      </p>
      {summary.map(([category, carbonValue]) => (
        <div key={category} className="mb-4">
          <ProgressBar
            value={carbonValue}
            max={categoryGoals[category] || 0} // Set max to the goal for the category, default to 0 if not set
            color={getCategoryColorClass(category)}
          >
            {category}
          </ProgressBar>
          {/* Display Feedback Below the ProgressBar */}
          <p className="mt-2 text-sm text-gray-700">
            {generateFeedback(category, carbonValue)}
          </p>
        </div>
      ))}
    </div>
  );
}