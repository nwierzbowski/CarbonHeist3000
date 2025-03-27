# CarbonHeist 3000

CarbonHeist 3000 is an interactive web application designed to help users monitor and reduce their carbon footprint. The project provides a range of tools and features to analyze personal carbon emissions, set reduction goals, and explore resources for sustainable living. With a clean and responsive design, CarbonHeist 3000 ensures accessibility and usability across all devices.

## Features

### 1. Dashboard
- Provides a centralized view of key data trends and insights.
- Interactive charts showing historical carbon footprint by category and overall emissions.
- Summary view highlighting tracked data and selected date insights.

### 2. Set Goals
- Allows users to define daily carbon emission goals by category and overall targets.
- Input fields for dynamically adjusting goals, with contextual error handling for invalid values.
- Real-time goal management using context-driven state.

### 3. Resource Library
- A searchable library of practical eco-friendly tips and resources.
- Resource cards displaying titles, descriptions, and external links to learn more.
- Responsive grid layout ensures seamless experience on all screen sizes.

### 4. Charts
- Visual representation of carbon footprint trends using dynamic line and pie charts.
- Aggregates emissions by category and selected dates, providing actionable insights.

### 5. Responsive Navigation
- Navbar with dynamic links to all core features.
- Always-visible Date Selector for seamless user experience.
- Hamburger menu for mobile screens, ensuring intuitive navigation on smaller devices.

### 6. Error Handling
- 404 Page for undefined routes, helping users navigate back to the main dashboard.
- Error boundary implementation to gracefully handle unexpected application errors.
- Clear and actionable fallback UI for error scenarios.

## Technologies Used
- **React**: Component-based architecture for efficient UI management.
- **React Router**: Enables seamless navigation across different pages.
- **Chart.js**: For interactive and responsive data visualization.
- **Tailwind CSS**: Utility-first styling framework for rapid and scalable design.
- **Context API**: Manages global state for activities, goals, and overall data tracking.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/carbonheist3000.git'
   npm i
   npm run dev
