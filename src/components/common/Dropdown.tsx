// src/components/common/Dropdown.tsx
import React from 'react';

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = {
  label: string;
  id: string;
  options: DropdownOption[];
  defaultValue?: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ label, id, options, defaultValue, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="dropdown-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} defaultValue={defaultValue} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
