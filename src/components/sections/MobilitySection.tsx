// src/components/sections/MobilitySection.tsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';

type MobilitySectionProps = {
  onDataChange: (data: any) => void;
  savedData?: any;
};

const MobilitySection: React.FC<MobilitySectionProps> = ({ onDataChange, savedData }) => {
  const [ueGroup, setUeGroup] = useState(savedData?.ueGroup || 'ApplyToAll');
  const [tripType, setTripType] = useState(savedData?.tripType || 'Bidirectional');
  const [delay, setDelay] = useState<number>(savedData?.delay || 5);
  const [duration, setDuration] = useState<number>(savedData?.duration || 600);
  const [waitTime, setWaitTime] = useState<number>(savedData?.waitTime || 0);

  useEffect(() => {
    onDataChange({ ueGroup, tripType, delay, duration, waitTime });
  }, [ueGroup, tripType, delay, duration, waitTime, onDataChange]);

  return (
    <div className="section mobility-section">
      <h2>Mobility Section</h2>
      <div className="section-main">
        <InputField
          type="dropdown"
          label="UE Group"
          id="ueGroup"
          options={[
            { label: 'ApplyToAll', value: 'ApplyToAll' },
            { label: 'Range #1', value: 'Range#1' },
          ]}
          defaultValue={ueGroup}
          onChange={setUeGroup}
        />
        <InputField
          type="dropdown"
          label="Trip Type"
          id="tripType"
          options={[
            { label: 'Bidirectional', value: 'Bidirectional' },
            { label: 'stationary', value: 'stationary' },
            { label: 'unidirectional', value: 'unidirectional' },
          ]}
          defaultValue={tripType}
          onChange={setTripType}
        />
        <InputField
          type="numeric"
          label="Delay (sec)"
          id="mobilityDelay"
          defaultValue={delay}
          onChange={(val) => setDelay(Number(val))}
        />
        <InputField
          type="numeric"
          label="Duration (sec)"
          id="mobilityDuration"
          defaultValue={duration}
          onChange={(val) => setDuration(Number(val))}
        />
        <InputField
          type="numeric"
          label="Wait Time (sec)"
          id="waitTime"
          defaultValue={waitTime}
          onChange={(val) => setWaitTime(Number(val))}
        />
      </div>
    </div>
  );
};

export default MobilitySection;
