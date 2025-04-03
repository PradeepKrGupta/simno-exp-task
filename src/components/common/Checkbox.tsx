// // src/components/common/Checkbox.tsx
// import React from "react";

// export interface CheckboxProps {
//   label: string;
//   checked: boolean;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
//   return (
//     <div className="checkbox-field">
//       <input type="checkbox" checked={checked} onChange={onChange} className="checkbox-control" />
//       <label className="checkbox-label">{label}</label>
//     </div>
//   );
// };

// export default Checkbox;



// ===========adding new code===========

// src/components/common/Checkbox.tsx
import React from "react";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-field">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-control"
      />
      <label className="checkbox-label">{label}</label>
    </div>
  );
};

export default Checkbox;

