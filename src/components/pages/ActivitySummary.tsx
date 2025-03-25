import { useActivityContext } from "../../context/ActivityContext";
import { Activity } from "../../data/activities";
import { categoryColors, getCategoryColorClass } from "../../data/categories";
import ProgressBar from "../activities/ProgressBar";

// Function to calculate carbon values by category
// Function to calculate carbon values by category
export function calculateCarbonByCategory(
  options: Activity[],
  allCategories: string[]
): Record<string, number> {
  // Initialize the summary object with all categories set to 0
  const summary = allCategories.reduce((accumulator, category) => {
    accumulator[category] = 0;
    return accumulator;
  }, {} as Record<string, number>);

  // Sum the carbon values for categories present in the activities
  options.forEach((activity) => {
    const category = activity.category;
    const carbonValue = parseFloat(activity.carbon_value);
    summary[category] += carbonValue;
  });

  return summary;
}

export default function ActivitySummary() {
  const { activities } = useActivityContext();

  const summary = Object.entries(calculateCarbonByCategory(activities, categoryColors.map(item => item.category)));

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
          max={10} // Adjust max based on your data scale
          color={getCategoryColorClass(category)}
        >
          {category}
        </ProgressBar>
      ))}
    </div>
  );
}