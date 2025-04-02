// src/components/common/NumberInput.tsx
import React from 'react';

export type NumberInputProps = {
  label: string;
  id: string;
  defaultValue?: number;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({ label, id, defaultValue, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="number-input-field">
      <label htmlFor={id}>{label}</label>
      <input type="number" id={id} defaultValue={defaultValue} onChange={handleChange} />
    </div>
  );
};

export default NumberInput;
