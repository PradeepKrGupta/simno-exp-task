// // src/components/sections/MobilitySection.tsx
// import React, { useState, useEffect } from "react";
// import Dropdown from "../common/Dropdown";
// import NumberInput from "../common/NumberInput";
// import { mobilityDefaults } from "../../config/formConfig";
// import { useFormContext } from "../../context/FormContext";

// interface MobilitySectionProps {
//   onNext: () => void;
// }

// const MobilitySection: React.FC<MobilitySectionProps> = ({ onNext }) => {
//   const { formData, updateFormData } = useFormContext();
//   const saved = formData.mobility || {};

//   const [ueGroup, setUeGroup] = useState<string>(saved.ueGroup || mobilityDefaults.ueGroup);
//   const [tripType, setTripType] = useState<string>(saved.tripType || mobilityDefaults.tripType);
//   const [delay, setDelay] = useState<number>(saved.delay || mobilityDefaults.delay);
//   const [duration, setDuration] = useState<number>(saved.duration || mobilityDefaults.duration);
//   const [waitTime, setWaitTime] = useState<number>(saved.waitTime || mobilityDefaults.waitTime);

//   const handleNext = () => {
//     const data = { ueGroup, tripType, delay, duration, waitTime };
//     updateFormData("mobility", data);
//     onNext();
//   };

//   useEffect(() => {
//     updateFormData("mobility", { ueGroup, tripType, delay, duration, waitTime });
//   }, [ueGroup, tripType, delay, duration, waitTime, updateFormData]);

//   return (
//     <div className="section-container">
//       <h2>Mobility Configuration</h2>
//       <Dropdown
//         label="UE Group"
//         value={ueGroup}
//         options={["ApplyToAll", "Range #1"]}
//         onChange={(e) => setUeGroup(e.target.value)}
//       />
//       <Dropdown
//         label="Trip Type"
//         value={tripType}
//         options={["Bidirectional", "Stationary", "Unidirectional"]}
//         onChange={(e) => setTripType(e.target.value)}
//       />
//       <NumberInput label="Delay (sec)" value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
//       <NumberInput label="Duration (sec)" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
//       <NumberInput label="Wait Time (sec)" value={waitTime} onChange={(e) => setWaitTime(Number(e.target.value))} />
//       <button className="next-button" onClick={handleNext}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default MobilitySection;




// =============adding new code for mobility enable and disable feature==========

import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import NumberInput from "../common/NumberInput";
import { mobilityDefaults } from "../../config/formConfig";
import { useFormContext } from "../../context/FormContext";

interface MobilitySectionProps {
  onNext: () => void;
}

const MobilitySection: React.FC<MobilitySectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const saved = formData.mobility || {};

  // Determine if any cell in the Cell Section has mobility set to "Yes"
  const cells = formData.cells || [];
  const mobilityEnabled = cells.some((cell: any) => cell.mobility === "Yes");

  // Local state for mobility parameters (only used if mobility is enabled)
  const [ueGroup, setUeGroup] = useState<string>(saved.ueGroup || mobilityDefaults.ueGroup);
  const [tripType, setTripType] = useState<string>(saved.tripType || mobilityDefaults.tripType);
  const [delay, setDelay] = useState<number>(saved.delay || mobilityDefaults.delay);
  const [duration, setDuration] = useState<number>(saved.duration || mobilityDefaults.duration);
  const [waitTime, setWaitTime] = useState<number>(saved.waitTime || mobilityDefaults.waitTime);

  const handleNext = () => {
    if (mobilityEnabled) {
      const data = { ueGroup, tripType, delay, duration, waitTime };
      updateFormData("mobility", data);
    } else {
      updateFormData("mobility", { enabled: false });
    }
    onNext();
  };

  useEffect(() => {
    if (mobilityEnabled) {
      updateFormData("mobility", { ueGroup, tripType, delay, duration, waitTime });
    } else {
      updateFormData("mobility", { enabled: false });
    }
  }, [ueGroup, tripType, delay, duration, waitTime, mobilityEnabled, updateFormData]);

  return (
    <div className="section-container">
      <h2>Mobility Configuration</h2>
      {mobilityEnabled ? (
        <>
          <Dropdown
            label="UE Group"
            value={ueGroup}
            options={["ApplyToAll", "Range #1"]}
            onChange={(e) => setUeGroup(e.target.value)}
          />
          <Dropdown
            label="Trip Type"
            value={tripType}
            options={["Bidirectional", "Stationary", "Unidirectional"]}
            onChange={(e) => setTripType(e.target.value)}
          />
          <NumberInput
            label="Delay (sec)"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
          <NumberInput
            label="Duration (sec)"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <NumberInput
            label="Wait Time (sec)"
            value={waitTime}
            onChange={(e) => setWaitTime(Number(e.target.value))}
          />
        </>
      ) : (
        <p className="info-text">
          No configuration required. Mobility is not enable for this test. Go to Cell Configuration to enable Mobility if required( Cell Configuration ).
        </p>
      )}
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default MobilitySection;
