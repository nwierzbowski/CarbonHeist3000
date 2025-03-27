import { useActivityContext } from "../../context/ActivityContext";
import { Activity } from "../../data/activities";

interface Props {
  newActivity: Activity;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Add({ newActivity, onClick, children }: Props) {
  const { addActivity } = useActivityContext();
  const { selectedDate } = useActivityContext();
  const handleAddActivity = () => {
    if (newActivity.description.trim()) {
      addActivity(newActivity, selectedDate);
      onClick(); // Close the dropdown after adding the activity
    }
  };

  return (
    <button
      onClick={handleAddActivity}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      {children}
    </button>
  );
}
