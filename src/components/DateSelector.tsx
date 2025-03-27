import React from "react";
import { useActivityContext } from "../context/ActivityContext";

const DateSelector: React.FC = () => {
  const { selectedDate, setSelectedDate } = useActivityContext();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value); // Update selectedDate in the context
  };

  // Increment the date by one day
  const incrementDate = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1); // Add one day
    setSelectedDate(currentDate.toISOString().split("T")[0]); // Update with the new date
  };

  // Decrement the date by one day
  const decrementDate = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1); // Subtract one day
    setSelectedDate(currentDate.toISOString().split("T")[0]); // Update with the new date
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        {/* Left carat as decrement button */}
        <button
          onClick={decrementDate}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          &lt;&lt;
        </button>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Right carat as increment button */}
        <button
          onClick={incrementDate}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default DateSelector;