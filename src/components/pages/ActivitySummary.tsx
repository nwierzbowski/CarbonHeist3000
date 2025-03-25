import { useActivityContext } from "../../context/ActivityContext";
import { getCategoryColorClass } from "../../data/categories";
import ProgressBar from "../activities/ProgressBar";

export default function ActivitySummary() {
  const { activities } = useActivityContext();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-gray-700 mb-6">
        Here you can view a summary of your activities and their impact on the
        environment.
      </p>
      {activities.map(a => (
        <ProgressBar
          key={getCategoryColorClass(a.category)}
          value={Number.parseFloat(a.carbon_value)}
          max={10}
          color={getCategoryColorClass(a.category)}
        >{a.category}</ProgressBar>
      ))}
    </div>
  );
}
