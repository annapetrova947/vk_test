import { GroupCard } from "../GroupCard/GroupCard";
import { Group, GroupsProps } from "./../../types";

import "./style.css";

export function Groups({ groups } : GroupsProps) {
  return (
    <div className="groups-list">
      {groups !== undefined ? (groups.length != 0 ? groups.map((group: Group) => (
        <GroupCard {...group} key={group.id} />
      )) : <p className="groups-list__undefined">Под данные фильтры нет групп</p>) : ""}
    </div>
  );
}
