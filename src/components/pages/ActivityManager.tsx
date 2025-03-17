import { options } from "../../data/activities";
import ActivityLog from "../activities/ActivityLog";
import DropdownSearch from "../activities/DropdownSearch";
import Header from "../general/Header";

export default function ActivityManager() {
  return (
    <div className="flex flex-col p-4 items-center">
      <Header>Activity Manager</Header>
      <DropdownSearch options={options}></DropdownSearch>
      <ActivityLog></ActivityLog>
    </div>
  );
}
