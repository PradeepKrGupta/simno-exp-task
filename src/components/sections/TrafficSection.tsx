// src/components/sections/TrafficSection.tsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';

type TrafficSectionProps = {
  onDataChange: (data: any) => void;
  savedData?: any;
};

const TrafficSection: React.FC<TrafficSectionProps> = ({ onDataChange, savedData }) => {
  const [profileRange, setProfileRange] = useState(savedData?.profileRange || 'ApplyToAll');
  const [attachType, setAttachType] = useState(savedData?.attachType || 'Bursty');
  const [attachRate, setAttachRate] = useState<number>(savedData?.attachRate || 1);
  const [attachDelay, setAttachDelay] = useState<number>(savedData?.attachDelay || 0);
  const [powerOnDuration, setPowerOnDuration] = useState<number>(savedData?.powerOnDuration || 605);
  const [staggerTime, setStaggerTime] = useState<number>(savedData?.staggerTime || 0);

  useEffect(() => {
    onDataChange({
      profileRange,
      attachType,
      attachRate,
      attachDelay,
      powerOnDuration,
      staggerTime: attachType === 'Staggered' ? staggerTime : undefined,
    });
  }, [profileRange, attachType, attachRate, attachDelay, powerOnDuration, staggerTime, onDataChange]);

  return (
    <div className="section traffic-section">
      <h2>Traffic Section</h2>
      <div className="section-header">
        <InputField
          type="dropdown"
          label="Profile Range"
          id="trafficProfileRangeHeader"
          options={[
            { label: 'ApplyToAll', value: 'ApplyToAll' },
            { label: 'Range #1', value: 'Range#1' },
            { label: 'Range #2', value: 'Range#2' },
          ]}
          defaultValue={profileRange}
          onChange={setProfileRange}
        />
      </div>
      <div className="section-main">
        <InputField
          type="dropdown"
          label="Profile Range"
          id="trafficProfileRangeMain"
          options={[
            { label: 'ApplyToAll', value: 'ApplyToAll' },
            { label: 'Range #1', value: 'Range#1' },
            { label: 'Range #2', value: 'Range#2' },
          ]}
          defaultValue={profileRange}
          onChange={setProfileRange}
        />
        <InputField
          type="dropdown"
          label="Attach Type"
          id="attachType"
          options={[
            { label: 'Bursty', value: 'Bursty' },
            { label: 'Staggered', value: 'Staggered' },
          ]}
          defaultValue={attachType}
          onChange={setAttachType}
        />
        {attachType === 'Staggered' ? (
          <InputField
            type="numeric"
            label="Stagger Time"
            id="staggerTime"
            defaultValue={staggerTime}
            onChange={(val) => setStaggerTime(Number(val))}
          />
        ) : (
          <>
            <InputField
              type="numeric"
              label="Attach Rate"
              id="attachRate"
              defaultValue={attachRate}
              onChange={(val) => setAttachRate(Number(val))}
            />
            <InputField
              type="numeric"
              label="Attach Delay (sec)"
              id="attachDelay"
              defaultValue={attachDelay}
              onChange={(val) => setAttachDelay(Number(val))}
            />
            <InputField
              type="numeric"
              label="Power on Duration (sec)"
              id="powerOnDuration"
              defaultValue={powerOnDuration}
              onChange={(val) => setPowerOnDuration(Number(val))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TrafficSection;
