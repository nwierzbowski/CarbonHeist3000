interface Props {
  value: number; // Current value of the progress
  max: number; // Maximum value of the progress
  color: string; // Color of the progress bar
}

export default function ProgressBar({ value, max, color }: Props) {
  // Ensure value doesn't exceed the maximum or fall below 0
  const progress = Math.min(Math.max(value, 0), max);

  // Calculate the width percentage
  const widthPercentage = (progress / max) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-md overflow-hidden">
      <div
        className={" h-6 transition-all duration-300 " + color}
        style={{ width: `${widthPercentage}%` }}
      ></div>
    </div>
  );
}
