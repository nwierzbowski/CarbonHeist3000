interface Props {
  value: number; // Current value of the progress
  max: number; // Maximum value of the progress
  color: string; // Color of the progress bar
  children?: React.ReactNode; // Children of the component
}

export default function ProgressBar({ value, max, color, children }: Props) {
  // Ensure value doesn't exceed the maximum or fall below 0
  const progress = Math.min(Math.max(value, 0), max);

  // Calculate the width percentage
  const widthPercentage = (progress / max) * 100;

  return (
    <div className="w-full bg-gray-600 rounded-md overflow-hidden m-1">
      
      <div
        className={"whitespace-nowrap m-1 h-6 transition-all duration-300 text-white font-bold " + color}
        style={{ width: `${widthPercentage}%` }}
      >{children}</div>
    </div>
  );
}
