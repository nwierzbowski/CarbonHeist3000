// Define the CategoryColor type
export interface CategoryColor {
  category: string;
  colorClass: string;
}

// List of categories and their associated Tailwind color classes
export const categoryColors: CategoryColor[] = [
  { category: "Physical Activity", colorClass: "bg-green-500" },
  { category: "Transportation", colorClass: "bg-blue-500" },
  { category: "Household", colorClass: "bg-yellow-500" },
  { category: "Energy Usage", colorClass: "bg-orange-500" },
  { category: "Personal Care", colorClass: "bg-purple-500" },
  { category: "Entertainment", colorClass: "bg-indigo-500" },
  { category: "Leisure", colorClass: "bg-teal-500" },
  { category: "Diet", colorClass: "bg-amber-500" },
  { category: "Shopping", colorClass: "bg-pink-500" },
  { category: "Work", colorClass: "bg-gray-500" },
];

// Function to get the Tailwind class for a specific category
export const getCategoryColorClass = (category: string): string => {
  const match = categoryColors.find((item) => item.category === category);
  return match ? match.colorClass : "bg-gray-300"; // Default class if not found
};
