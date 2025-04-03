// // src/components/FormNavigation.tsx
// import React from "react";
// import "../styles/main.css";

// interface Section {
//   key: string;
//   label: string;
// }

// interface FormNavigationProps {
//   sections: Section[];
//   activeSection: string;
//   setActiveSection: (section: string) => void;
// }

// const FormNavigation: React.FC<FormNavigationProps> = ({ sections, activeSection, setActiveSection }) => {
//   return (
//     <nav className="form-navigation">
//       {sections.map((section) => (
//         <button
//           key={section.key}
//           className={`nav-button ${activeSection === section.key ? "active" : ""}`}
//           onClick={() => setActiveSection(section.key)}
//         >
//           {section.label}
//         </button>
//       ))}
//     </nav>
//   );
// };

// export default FormNavigation;


// ===========Trying new codee============

// src/components/FormNavigation.tsx
import React from "react";
import "../styles/main.css";

interface Section {
  key: string;
  label: string;
}

interface FormNavigationProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  sections,
  activeSection,
  setActiveSection,
}) => {
  return (
    <nav className="form-navigation">
      {sections.map((section) => (
        <button
          key={section.key}
          className={`nav-button ${activeSection === section.key ? "active" : ""}`}
          onClick={() => setActiveSection(section.key)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

export default FormNavigation;
