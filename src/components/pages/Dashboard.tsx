import { options } from "../../data/activities";
import ActivityLog from "../dashboard/ActivityLog";
import DropdownSearch from "../dashboard/DropdownSearch";
import Header from "../general/Header";
import ActivitySummary from "../dashboard/ActivitySummary";

export default function Dashboard() {
  return (
    <div className="flex justify-between">
      {/* Left div takes half the screen */}
      <div className="flex flex-col w-1/2 p-4 items-center">
        <Header>Daily Activity Log</Header>
        <DropdownSearch options={options}></DropdownSearch>
        <ActivityLog></ActivityLog>
      </div>

      {/* Right div takes half the screen */}
      <div className="flex flex-col w-1/2 items-center">
        <Header>Daily Activity Summary</Header>
        <ActivitySummary></ActivitySummary>
      </div>
    </div>
  );
}