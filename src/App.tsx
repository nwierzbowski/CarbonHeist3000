import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resources from "./components/pages/Resources";
import Navbar from "./components/navbar/Navbar";
import { ActivityProvider } from "./context/ActivityContext";
import { ReactNode } from "react";
import Dashboard from "./components/pages/Dashboard";
import { Goals } from "./components/pages/Goals";
import { GoalProvider } from "./context/GoalContext";
import { CarbonFootprintDashboard } from "./components/pages/CarbonFootPrintDashboard";
import React from "react";

// 404 Page Component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
    <p className="text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
    <a href="/" className="mt-6 text-blue-500 hover:underline">
      Back to Dashboard
    </a>
  </div>
);

export type Nav = { link: string; name: string; page: ReactNode };

const directory = [
  { link: "/", name: "Dashboard", page: <Dashboard /> },
  { link: "/charts", name: "Charts", page: <CarbonFootprintDashboard /> },
  { link: "/resources", name: "Resources", page: <Resources /> },
  { link: "/goals", name: "Set Goals", page: <Goals /> },
];

// Error Boundary for graceful error handling
class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You could log the error to an error reporting service here
    console.error("Error Boundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold text-red-500">Something went wrong</h1>
          <p className="text-gray-700 mt-4">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <a href="/" className="mt-6 text-blue-500 hover:underline">
            Back to Dashboard
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ActivityProvider>
      <GoalProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Navbar links={directory}>CarbonHeist 3000</Navbar>
            <div className="pt-16">
              <Routes>
                {directory.map((item: Nav) => (
                  <Route key={item.link} path={item.link} element={item.page} />
                ))}
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </GoalProvider>
    </ActivityProvider>
  );
}

export default App;