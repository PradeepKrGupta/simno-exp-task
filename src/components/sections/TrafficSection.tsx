// src/components/sections/TrafficSection.tsx
import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import NumberInput from "../common/NumberInput";
import { trafficDefaults } from "../../config/formConfig";
import { useFormContext } from "../../context/FormContext";

interface TrafficSectionProps {
  onNext: () => void;
}

const TrafficSection: React.FC<TrafficSectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const saved = formData.traffic || {};

  const [profileRange, setProfileRange] = useState<string>(saved.profileRange || trafficDefaults.profileRange);
  const [attachType, setAttachType] = useState<string>(saved.attachType || trafficDefaults.attachType);
  const [attachRate, setAttachRate] = useState<number>(saved.attachRate || trafficDefaults.attachRate);
  const [attachDelay, setAttachDelay] = useState<number>(saved.attachDelay || trafficDefaults.attachDelay);
  const [powerOnDuration, setPowerOnDuration] = useState<number>(saved.powerOnDuration || trafficDefaults.powerOnDuration);
  const [staggerTime, setStaggerTime] = useState<number>(saved.staggerTime || trafficDefaults.staggerTime);

  const handleNext = () => {
    const data = {
      profileRange,
      attachType,
      attachRate,
      attachDelay,
      powerOnDuration,
      staggerTime: attachType === "Staggered" ? staggerTime : undefined,
    };
    updateFormData("traffic", data);
    onNext();
  };

  useEffect(() => {
    updateFormData("traffic", { profileRange, attachType, attachRate, attachDelay, powerOnDuration, staggerTime });
  }, [profileRange, attachType, attachRate, attachDelay, powerOnDuration, staggerTime, updateFormData]);

  return (
    <div className="section-container">
      <h2>Traffic Configuration</h2>
      <Dropdown
        label="Profile Range"
        value={profileRange}
        options={["ApplyToAll", "Range #1", "Range #2"]}
        onChange={(e) => setProfileRange(e.target.value)}
      />
      <Dropdown
        label="Attach Type"
        value={attachType}
        options={["Bursty", "Staggered"]}
        onChange={(e) => setAttachType(e.target.value)}
      />
      {attachType === "Staggered" ? (
        <NumberInput label="Stagger Time" value={staggerTime} onChange={(e) => setStaggerTime(Number(e.target.value))} />
      ) : (
        <>
          <NumberInput label="Attach Rate" value={attachRate} onChange={(e) => setAttachRate(Number(e.target.value))} />
          <NumberInput label="Attach Delay (sec)" value={attachDelay} onChange={(e) => setAttachDelay(Number(e.target.value))} />
          <NumberInput label="Power on Duration (sec)" value={powerOnDuration} onChange={(e) => setPowerOnDuration(Number(e.target.value))} />
        </>
      )}
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default TrafficSection;
