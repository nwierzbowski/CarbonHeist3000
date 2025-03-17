import { useActivityContext } from "../../context/ActivityContext";

export default function ActivityLog() {
  const { activities, removeActivity } = useActivityContext();
  return (
    <table className="mb-4 table-auto">
      <thead>
        <tr>
          <th className="px-2">Description</th>
          <th className="px-2">Category</th>
          <th className="px-2">Carbon Value</th>
          <th className="px-2">Unit</th>
          <th className="px-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, i) => (
          <tr key={i}>
            <td className="px-2">{activity.description}</td>
            <td className="px-2">{activity.category}</td>
            <td className="px-2">{activity.carbon_value}</td>
            <td className="px-2">{activity.unit}</td>
            <td className="py-1">
              <div>
                <button
                  onClick={() => removeActivity(i)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
