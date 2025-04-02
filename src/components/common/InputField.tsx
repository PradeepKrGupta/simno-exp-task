// src/components/common/InputField.tsx
import React from 'react';

export type InputFieldProps = {
  type: 'alphanumeric' | 'numeric' | 'string' | 'dropdown';
  label: string;
  id: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: string }>;
  onChange: (value: any) => void;
};

const InputField: React.FC<InputFieldProps> = ({ type, label, id, defaultValue, options, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      {type === 'dropdown' ? (
        <select id={id} defaultValue={defaultValue} onChange={handleChange}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type === 'numeric' ? 'number' : 'text'}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default InputField;
