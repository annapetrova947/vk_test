import { Option, FiltersProps } from "../../types";

import "./style.css";

export function Filter({ label, filterBy, options, onChange }: FiltersProps) {
  
  return (
    <div className="filter">
      <label className="filter__label">
        {label}
        </label>
        <select onChange={(event: React.ChangeEvent<{ value: string }>) => onChange(filterBy, event.target.value)}>
          {options.map((option: Option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      
    </div>
  );
}
