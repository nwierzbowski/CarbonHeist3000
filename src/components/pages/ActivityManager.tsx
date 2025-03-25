import { options } from "../../data/activities";
import ActivityLog from "../activities/ActivityLog";
import DropdownSearch from "../activities/DropdownSearch";
import DateSelector from "../DateSelector";
import Header from "../general/Header";
import ActivitySummary from "./ActivitySummary";

export default function ActivityManager() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col p-4 items-center">
        <Header>Activity Manager</Header>
        <DropdownSearch options={options}></DropdownSearch>
        <DateSelector />

        <ActivityLog></ActivityLog>
      </div>
      <div className="flex flex-col p-4 items-center">
        <Header>Activity Summary</Header>
        <ActivitySummary></ActivitySummary>
      </div>
    </div>
  );
}
