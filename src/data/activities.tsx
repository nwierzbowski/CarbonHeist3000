// Define the activity object shape
export interface Activity {
  description: string;
  category: string;
  carbon_value: string;
  unit: string;
}

export const options = [
  {
    description: "Morning jog",
    category: "Physical Activity",
    carbon_value: "0.05",
    unit: "per 30 minutes",
  },
  {
    description: "Driving to work",
    category: "Transportation",
    carbon_value: "2.8",
    unit: "per 10 miles",
  },
  {
    description: "Taking a bus to the store",
    category: "Transportation",
    carbon_value: "0.5",
    unit: "per 10 miles",
  },
  {
    description: "Grocery shopping",
    category: "Household",
    carbon_value: "0.15",
    unit: "per trip",
  },
  {
    description: "Cooking dinner",
    category: "Household",
    carbon_value: "0.3",
    unit: "per meal",
  },
  {
    description: "Using air conditioning",
    category: "Energy Usage",
    carbon_value: "1.0",
    unit: "per hour",
  },
  {
    description: "Taking a shower",
    category: "Personal Care",
    carbon_value: "0.2",
    unit: "per 5 minutes",
  },
  {
    description: "Watching TV",
    category: "Entertainment",
    carbon_value: "0.1",
    unit: "per hour",
  },
  {
    description: "Cycling to work",
    category: "Transportation",
    carbon_value: "0.1",
    unit: "per 10 miles",
  },
  {
    description: "Reading a book",
    category: "Leisure",
    carbon_value: "0.02",
    unit: "per hour",
  },
  {
    description: "Laundry",
    category: "Household",
    carbon_value: "0.8",
    unit: "per load",
  },
  {
    description: "Eating a meat-based meal",
    category: "Diet",
    carbon_value: "1.5",
    unit: "per meal",
  },
  {
    description: "Eating a vegetarian meal",
    category: "Diet",
    carbon_value: "0.4",
    unit: "per meal",
  },
  {
    description: "Using a public restroom",
    category: "Personal Care",
    carbon_value: "0.05",
    unit: "per use",
  },
  {
    description: "Online shopping",
    category: "Shopping",
    carbon_value: "0.3",
    unit: "per order",
  },
  {
    description: "Cleaning the house",
    category: "Household",
    carbon_value: "0.2",
    unit: "per hour",
  },
  {
    description: "Working from home",
    category: "Work",
    carbon_value: "0.6",
    unit: "per workday",
  },
  {
    description: "Commuting by train",
    category: "Transportation",
    carbon_value: "0.3",
    unit: "per 10 miles",
  },
  {
    description: "Reading the news on a tablet",
    category: "Leisure",
    carbon_value: "0.05",
    unit: "per hour",
  },
  {
    description: "Using a dishwasher",
    category: "Household",
    carbon_value: "0.9",
    unit: "per load",
  },
  {
    description: "Walking the dog",
    category: "Physical Activity",
    carbon_value: "0.1",
    unit: "per 30 minutes",
  },
  {
    description: "Carpooling with a friend",
    category: "Transportation",
    carbon_value: "1.5",
    unit: "per 10 miles",
  },
  {
    description: "Running errands by bike",
    category: "Transportation",
    carbon_value: "0.1",
    unit: "per 10 miles",
  },
  {
    description: "Watching a movie at home",
    category: "Entertainment",
    carbon_value: "0.2",
    unit: "per movie",
  },
  {
    description: "Using a clothes dryer",
    category: "Household",
    carbon_value: "1.5",
    unit: "per load",
  },
  {
    description: "Ordering food delivery",
    category: "Diet",
    carbon_value: "0.8",
    unit: "per order",
  },
];
