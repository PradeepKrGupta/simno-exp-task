// src/components/sections/SubscriberSection.tsx
import React, { useState, useEffect } from "react";
import NumberInput from "../common/NumberInput";
import InputField from "../common/InputField";
import { subscriberDefaults } from "../../config/formConfig";
import { useFormContext } from "../../context/FormContext";
import { validateSubscriberSection } from "../../utils/formUtils";

interface SubscriberSectionProps {
  onNext: () => void;
}

const SubscriberSection: React.FC<SubscriberSectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const saved = formData.subscriber || {};

  const [totalUEs, setTotalUEs] = useState<number>(saved.totalUEs || subscriberDefaults.totalUEs);
  const [startingSupi, setStartingSupi] = useState<string>(saved.startingSupi || subscriberDefaults.startingSupi);
  const [sharedKey, setSharedKey] = useState<string>(saved.sharedKey || subscriberDefaults.sharedKey);
  const [mncDigits, setMncDigits] = useState<number>(saved.mncDigits || subscriberDefaults.mncDigits);

  const handleNext = () => {
    const data = { totalUEs, startingSupi, sharedKey, mncDigits };
    const validation = validateSubscriberSection(data);
    if (validation === true) {
      updateFormData("subscriber", data);
      onNext();
    } else {
      alert(validation);
    }
  };

  useEffect(() => {
    updateFormData("subscriber", { totalUEs, startingSupi, sharedKey, mncDigits });
  }, [totalUEs, startingSupi, sharedKey, mncDigits, updateFormData]);

  return (
    <div className="section-container">
      <h2>Subscriber Configuration</h2>
      <NumberInput label="Total # of UEs" value={totalUEs} onChange={(e) => setTotalUEs(Number(e.target.value))} />
      <InputField label="Starting SUPI" value={startingSupi} onChange={(e) => setStartingSupi(e.target.value)} />
      <InputField label="Shared Key" value={sharedKey} onChange={(e) => setSharedKey(e.target.value)} />
      <NumberInput label="MNC Digits" value={mncDigits} onChange={(e) => setMncDigits(Number(e.target.value))} />
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default SubscriberSection;
