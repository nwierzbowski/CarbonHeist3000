import { categoryColors } from "../../data/categories";
import ProgressBar from "../activities/ProgressBar";

export default function ActivitySummary() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-gray-700 mb-6">
        Here you can view a summary of your activities and their impact on the
        environment.
      </p>
      {categoryColors.map((color) => (
        <ProgressBar
          key={color.colorClass}
          value={4}
          max={10}
          color={color.colorClass}
        ></ProgressBar>
      ))}
    </div>
  );
}
