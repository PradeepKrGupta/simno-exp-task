// // src/App.tsx
// import React, { useState } from "react";
// import FormNavigation from "./components/FormNavigation";
// import CellSection from "./components/sections/CellSection";
// import SubscriberSection from "./components/sections/SubscriberSection";
// import UserPlaneSection from "./components/sections/UserPlaneSection";
// import TrafficSection from "./components/sections/TrafficSection";
// import MobilitySection from "./components/sections/MobilitySection";
// import SettingsSection from "./components/sections/SettingsSection";
// import { FormProvider } from "./context/FormContext";
// import "./styles/main.css";

// const App: React.FC = () => {
//   // We'll display all sections in one page; you can navigate using tabs.
//   const sections = [
//     { key: "Cell", label: "Cell", component: <CellSection /> },
//     { key: "Subscriber", label: "Subscriber", component: <SubscriberSection /> },
//     { key: "UserPlane", label: "User Plane", component: <UserPlaneSection /> },
//     { key: "Traffic", label: "Traffic", component: <TrafficSection /> },
//     { key: "Mobility", label: "Mobility", component: <MobilitySection /> },
//     { key: "Settings", label: "Settings", component: <SettingsSection /> },
//   ];

//   const [activeSection, setActiveSection] = useState<string>("Cell");

//   return (
//     <FormProvider>
//       <div className="app-container">
//         <h1 className="app-title">Network Test Case Configuration</h1>
//         <FormNavigation
//           sections={sections}
//           activeSection={activeSection}
//           setActiveSection={setActiveSection}
//         />
//         <div className="section-content">
//           {sections.find((sec) => sec.key === activeSection)?.component}
//         </div>
//       </div>
//     </FormProvider>
//   );
// };

// export default App;



// ===========Trying new code==========

// src/App.tsx
import React, { useState } from "react";
import FormNavigation from "./components/FormNavigation";
import CellSection from "./components/sections/CellSection";
import SubscriberSection from "./components/sections/SubscriberSection";
import UserPlaneSection from "./components/sections/UserPlaneSection";
import TrafficSection from "./components/sections/TrafficSection";
import MobilitySection from "./components/sections/MobilitySection";
import SettingsSection from "./components/sections/SettingsSection";
import { FormProvider } from "./context/FormContext";
import "./styles/main.css";

const App: React.FC = () => {
  const sections = [
    { key: "Cell", label: "Cell" },
    { key: "Subscriber", label: "Subscriber" },
    { key: "UserPlane", label: "User Plane" },
    { key: "Traffic", label: "Traffic" },
    { key: "Mobility", label: "Mobility" },
    { key: "Settings", label: "Settings" },
  ];

  const [activeSection, setActiveSection] = useState<string>("Cell");

  const handleNextSection = () => {
    const currentIndex = sections.findIndex((s) => s.key === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].key);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Cell":
        return <CellSection onNext={handleNextSection} />;
      case "Subscriber":
        return <SubscriberSection onNext={handleNextSection} />;
      case "UserPlane":
        return <UserPlaneSection onNext={handleNextSection} />;
      case "Traffic":
        return <TrafficSection onNext={handleNextSection} />;
      case "Mobility":
        return <MobilitySection onNext={handleNextSection} />;
      case "Settings":
        return <SettingsSection onNext={handleNextSection} />;
      default:
        return <div>Unknown Section</div>;
    }
  };

  return (
    <FormProvider>
      <div className="app-container">
        <h1 className="app-title">Simnovator Experiment Project</h1>
        <FormNavigation
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="section-content">{renderActiveSection()}</div>
      </div>
    </FormProvider>
  );
};

export default App;
