// // src/components/common/InputField.tsx
// import React from "react";

// export interface InputFieldProps {
//   label: string;
//   value: string;
//   type?: string;
//   placeholder?: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const InputField: React.FC<InputFieldProps> = ({ label, value, type = "text", placeholder, onChange }) => {
//   return (
//     <div className="input-field">
//       <label className="input-label">{label}</label>
//       <input
//         type={type}
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//         className="input-control"
//       />
//     </div>
//   );
// };

// export default InputField;


// ==========adding new code============

// src/components/common/InputField.tsx
import React from "react";

export interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}) => {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="input-control"
      />
    </div>
  );
};

export default InputField;
