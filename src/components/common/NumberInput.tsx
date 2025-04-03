// // src/components/common/NumberInput.tsx
// import React from "react";

// export interface NumberInputProps {
//   label: string;
//   value: number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
// }

// const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, placeholder }) => {
//   return (
//     <div className="number-input-field">
//       <label className="input-label">{label}</label>
//       <input
//         type="number"
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//         className="input-control"
//       />
//     </div>
//   );
// };

// export default NumberInput;



// ===============adding new codae============


// src/components/common/NumberInput.tsx
import React from "react";

export interface NumberInputProps {
  label: string;
  value: number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, placeholder, onChange }) => {
  return (
    <div className="number-input-field">
      <label className="input-label">{label}</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="input-control"
      />
    </div>
  );
};

export default NumberInput;
