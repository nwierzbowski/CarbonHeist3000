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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-gray-700 mb-6">
        Here you can view a summary of your activities and their impact on the
        environment.
      </p>
      {summary.map(([category, carbonValue]) => (
        <ProgressBar
          key={category}
          value={carbonValue}
          max={categoryGoals[category] || 0} // Set max to the goal for the category, default to 0 if not set
          color={getCategoryColorClass(category)}
        >
          {category}
        </ProgressBar>
      ))}
    </div>
  );
}