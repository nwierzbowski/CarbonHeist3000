import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the updated Activity interface to include a date field
export interface Activity {
  description: string;
  category: string;
  carbon_value: string;
  unit: string;
  date: string; // Date field for tracking activity date
}

// Define the context value shape
interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Activity, date: string) => void; // Accepts a date parameter
  removeActivity: (i: number) => void;
  selectedDate: string; // Tracks the currently selected date
  setSelectedDate: (date: string) => void; // Function to update the selected date
}

// Create the context
const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// Provider Component
interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  // Initialize activities from localStorage or default to an empty array
  const [activities, setActivities] = useState<Activity[]>(() => {
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Add an activity with a specified date
  const addActivity = (activity: Activity, date: string) => {
    const newActivity = {
      ...activity,
      date, // Use the provided date
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  // Remove an activity by its index
  const removeActivity = (i: number) => {
    setActivities((prev) => prev.filter((_activity, idx) => idx !== i));
  };

  // Selected date state
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date().toISOString().split("T")[0]; // Default to today's date
    return today;
  });

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        removeActivity,
        selectedDate,
        setSelectedDate, // Provide setter for selected date
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

// Hook for consuming the context
export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "useActivityContext must be used within an ActivityProvider"
    );
  }
  return context;
};