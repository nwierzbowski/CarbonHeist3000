import { useState, useRef, useEffect } from "react";

import Add from "./Add";
import { Activity } from "../../data/activities";

interface Props {
  options: Activity[]; // Type for the options prop
}

export default function DropdownSearch({ options }: Props) {
  const [search, setSearch] = useState(""); // State to manage search input
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const [newActivity, setNewActivity] = useState({
    description: "",
    category: "",
    carbon_value: "",
    unit: "",
  });

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredActivities = options.filter((op) =>
    op.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="relative w-64" ref={dropdownRef}>
        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search activities..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((op, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSearch(op.description);
                    setIsOpen(false);
                    setNewActivity(op);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {op.description}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No activities found</div>
            )}
          </div>
        )}
      </div>

      {/* Add Button */}
      <Add newActivity={newActivity} onClick={() => setSearch("")}>
        Add
      </Add>
    </div>
  );
}
