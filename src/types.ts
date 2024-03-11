export interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

export interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

export interface User {
  first_name: string;
  last_name: string;
}

export interface Filters {
  closed: boolean | null;
  color: string | null;
  friends: boolean | null;
}

export interface Option {
  label: string | undefined;
  value: string
}

export interface FiltersProps {
  label: string;
  filterBy: string;
  options: Array<Option> 
  onChange: (field: string, value: string | boolean | null) => void
}

export interface GroupsProps{
  groups: Array<Group> | undefined
}