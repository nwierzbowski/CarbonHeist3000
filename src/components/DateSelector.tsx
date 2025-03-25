import React from "react";
import { useActivityContext } from "../context/ActivityContext";

const DateSelector: React.FC = () => {
  const { selectedDate, setSelectedDate } = useActivityContext(); // Use selectedDate from context

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value); // Update selectedDate in the context
  };

  return (
    <div className="p-4">
      <label htmlFor="datePicker" className="block mb-2 text-lg font-semibold">
        Select a Date:
      </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {selectedDate && (
        <p className="mt-4 text-blue-600">
          Selected Date: <strong>{selectedDate}</strong>
        </p>
      )}
    </div>
  );
};

export default DateSelector;