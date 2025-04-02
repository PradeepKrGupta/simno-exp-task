// src/components/common/Checkbox.tsx
import React from 'react';

export type CheckboxProps = {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, id, checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="checkbox-field">
      <input type="checkbox" id={id} checked={checked} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
