import { options } from "../../data/activities";
import ActivityLog from "../dashboard/ActivityLog";
import DropdownSearch from "../dashboard/DropdownSearch";
import DateSelector from "../DateSelector";
import Header from "../general/Header";
import ActivitySummary from "../dashboard/ActivitySummary";

export default function Dashboard() {
  return (
    <div className="flex justify-between">
      {/* Left div takes half the screen */}
      <div className="flex flex-col w-1/2 p-4 items-center">
        <Header>Activity Log</Header>
        <DropdownSearch options={options}></DropdownSearch>
        <DateSelector />
        <ActivityLog></ActivityLog>
      </div>

      {/* Right div takes half the screen */}
      <div className="flex flex-col w-1/2 items-center">
        <Header>Activity Summary</Header>
        <ActivitySummary></ActivitySummary>
      </div>
    </div>
  );
}