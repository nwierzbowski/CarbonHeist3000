import { useActivityContext } from "../../context/ActivityContext";
import Title from "../general/Title";

export default function ActivityLog() {
  const { activities, removeActivity } = useActivityContext();
  const { selectedDate } = useActivityContext();
  return (
    <table className="mb-4 table-auto">
      <thead>
        <tr>
          <th className="px-2">
            <Title>Description</Title>
          </th>
          <th className="px-2">
            <Title>Category</Title>
          </th>
          <th className="px-2">
            <Title>Carbon Value</Title>
          </th>
          <th className="px-2">
            <Title>Unit</Title>
          </th>
          <th className="px-2 py-1">
            <Title>Action</Title>
          </th>
        </tr>
      </thead>
      <tbody>
        {activities[selectedDate]?.map((activity, i) => (
          <tr key={i}>
            <td className="px-2">{activity.description}</td>
            <td className="px-2">{activity.category}</td>
            <td className="px-2">{activity.carbon_value}</td>
            <td className="px-2">{activity.unit}</td>
            <td className="py-1">
              <button
                onClick={() => removeActivity(selectedDate, i)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
