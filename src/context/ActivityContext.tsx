import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the updated Activity interface
export interface Activity {
  description: string;
  category: string;
  carbon_value: string;
  unit: string;
}

// Define the context value shape
interface ActivityContextType {
  activities: Record<string, Activity[]>; // Keys are dates, values are arrays of activities
  addActivity: (activity: Activity, date: string) => void; // Accepts a date parameter
  removeActivity: (date: string, index: number) => void; // Remove activity by date and index
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
  // Initialize activities as an object with dates as keys and arrays of activities as values
  const [activities, setActivities] = useState<Record<string, Activity[]>>(() => {
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : {};
  });

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Add an activity to a specific date
  const addActivity = (activity: Activity, date: string) => {
    const index = activities[date]?.length || 0; // Get the current length of the array
    setActivities((prev) => {
      const updatedActivities = { ...prev };
      if (!updatedActivities[date]) {
        updatedActivities[date] = []; // Initialize the array if the date doesn't exist
      }
      updatedActivities[date][index] = activity; // Add the activity to the specified date
      return updatedActivities;
    });
  };

  // Remove an activity from a specific date by index
  const removeActivity = (date: string, index: number) => {
    setActivities((prev) => {
      const updatedActivities = { ...prev };
      if (updatedActivities[date]) {
        updatedActivities[date] = updatedActivities[date].filter((_activity, idx) => idx !== index);
        // Clean up empty arrays (optional)
        if (updatedActivities[date].length === 0) {
          delete updatedActivities[date];
        }
      }
      return updatedActivities;
    });
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
        setSelectedDate,
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
    throw new Error("useActivityContext must be used within an ActivityProvider");
  }
  return context;
};