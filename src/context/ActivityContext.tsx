import { createContext, useContext, useState, ReactNode } from "react";
import { Activity } from "../data/activities";

// Define the context value shape
interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  removeActivity: (i: number) => void;
}

// Create the context
const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

// Provider Component
interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Add an activity
  const addActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  // Remove an activity by its description
  const removeActivity = (i: number) => {
    setActivities(activities.filter((_activity, idx) => idx !== i));
  };

  return (
    <ActivityContext.Provider
      value={{ activities, addActivity, removeActivity }}
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
