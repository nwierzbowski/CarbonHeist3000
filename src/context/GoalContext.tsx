import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the structure for category goals
export interface CategoryGoals {
  [category: string]: number; // Key: category name, Value: goal in kg CO₂
}

// Define the context value shape
interface GoalContextType {
  categoryGoals: CategoryGoals; // Goals for each category
  overallGoal: number; // Total daily goal
  setCategoryGoal: (category: string, goal: number) => void; // Function to update category goals
  setOverallGoal: (goal: number) => void; // Function to update the overall goal
}

// Create the context
const GoalContext = createContext<GoalContextType | undefined>(undefined);

// Provider Component
interface GoalProviderProps {
  children: ReactNode;
}

export const GoalProvider = ({ children }: GoalProviderProps) => {
  // Retrieve initial goals from localStorage or initialize with empty values
  const [categoryGoals, setCategoryGoals] = useState<CategoryGoals>(() => {
    const storedCategoryGoals = localStorage.getItem("categoryGoals");
    return storedCategoryGoals ? JSON.parse(storedCategoryGoals) : {};
  });

  const [overallGoal, setOverallGoal] = useState<number>(() => {
    const storedOverallGoal = localStorage.getItem("overallGoal");
    return storedOverallGoal ? Number(storedOverallGoal) : 0;
  });

  // Save category goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("categoryGoals", JSON.stringify(categoryGoals));
  }, [categoryGoals]);

  // Save overall goal to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("overallGoal", overallGoal.toString());
  }, [overallGoal]);

  // Function to update a specific category goal
  const setCategoryGoal = (category: string, goal: number) => {
    setCategoryGoals((prev) => ({
      ...prev,
      [category]: goal,
    }));
  };

  // Function to update the overall daily goal
  const updateOverallGoal = (goal: number) => {
    setOverallGoal(goal);
  };

  return (
    <GoalContext.Provider
      value={{
        categoryGoals,
        overallGoal,
        setCategoryGoal,
        setOverallGoal: updateOverallGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

// Hook for consuming the context
export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoalContext must be used within a GoalProvider");
  }
  return context;
};