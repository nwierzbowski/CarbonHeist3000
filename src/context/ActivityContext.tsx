import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Activity } from "../data/activities";

// Define the context value shape
interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  removeActivity: (i: number) => void;
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

  // Add an activity
  const addActivity = (activity: Activity) => {
    setActivities((prev) => [...prev, activity]);
  };

  // Remove an activity by its index
  const removeActivity = (i: number) => {
    setActivities((prev) => prev.filter((_activity, idx) => idx !== i));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, removeActivity }}>
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