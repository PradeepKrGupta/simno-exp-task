// src/components/sections/SettingsSection.tsx
import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Dropdown from "../common/Dropdown";
import { settingsDefaults } from "../../config/formConfig";
import { useFormContext } from "../../context/FormContext";

interface SettingsSectionProps {
  onNext: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const saved = formData.settings || {};

  const [testCaseName, setTestCaseName] = useState<string>(saved.testCaseName || settingsDefaults.testCaseName);
  const [logSetting, setLogSetting] = useState<string>(saved.logSetting || settingsDefaults.logSetting);
  const [successSetting, setSuccessSetting] = useState<string>(saved.successSetting || settingsDefaults.successSetting);

  const handleCreate = () => {
    const data = { testCaseName, logSetting, successSetting };
    updateFormData("settings", data);
    // Log complete JSON of all sections
    console.log("Complete Form Data:", formData);
    onNext();
  };

  useEffect(() => {
    updateFormData("settings", { testCaseName, logSetting, successSetting });
  }, [testCaseName, logSetting, successSetting, updateFormData]);

  return (
    <div className="section-container">
      <h2>Settings</h2>
      <InputField label="Test Case Name" value={testCaseName} onChange={(e) => setTestCaseName(e.target.value)} />
      <Dropdown
        label="Log Setting"
        value={logSetting}
        options={["debug", "error", "rrc_debug"]}
        onChange={(e) => setLogSetting(e.target.value)}
      />
      <Dropdown
        label="Success Setting"
        value={successSetting}
        options={["new21", "Bler Success", "throughput Success"]}
        onChange={(e) => setSuccessSetting(e.target.value)}
      />
      <button className="next-button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default SettingsSection;
