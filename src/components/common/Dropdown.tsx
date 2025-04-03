// // src/components/common/Dropdown.tsx
// import React from "react";

// export interface DropdownProps {
//   label: string;
//   value: string;
//   options: string[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
//   return (
//     <div className="dropdown-field">
//       <label className="input-label">{label}</label>
//       <select value={value} onChange={onChange} className="input-control">
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Dropdown;



// =============adding new code==========


// src/components/common/Dropdown.tsx
import React from "react";

export interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="dropdown-field">
      <label className="input-label">{label}</label>
      <select value={value} onChange={onChange} className="input-control">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

