// src/components/sections/SettingsSection.tsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';

type SettingsSectionProps = {
  onDataChange: (data: any) => void;
  savedData?: any;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ onDataChange, savedData }) => {
  const [testCaseName, setTestCaseName] = useState(savedData?.testCaseName || '');
  const [logSetting, setLogSetting] = useState(savedData?.logSetting || 'debug');
  const [successSetting, setSuccessSetting] = useState(savedData?.successSetting || 'new21');

  useEffect(() => {
    onDataChange({ testCaseName, logSetting, successSetting });
  }, [testCaseName, logSetting, successSetting, onDataChange]);

  return (
    <div className="section settings-section">
      <h2>Settings Section</h2>
      <div className="section-main">
        <InputField
          type="string"
          label="Test Case Name"
          id="testCaseName"
          defaultValue={testCaseName}
          onChange={setTestCaseName}
        />
        <InputField
          type="dropdown"
          label="Log Setting"
          id="logSetting"
          options={[
            { label: 'debug', value: 'debug' },
            { label: 'error', value: 'error' },
            { label: 'rrc_debug', value: 'rrc_debug' },
          ]}
          defaultValue={logSetting}
          onChange={setLogSetting}
        />
        <InputField
          type="dropdown"
          label="Success Setting"
          id="successSetting"
          options={[
            { label: 'new21', value: 'new21' },
            { label: 'Bler Success', value: 'Bler Success' },
            { label: 'throughput Success', value: 'throughput Success' },
          ]}
          defaultValue={successSetting}
          onChange={setSuccessSetting}
        />
      </div>
    </div>
  );
};

export default SettingsSection;
