// src/components/sections/UserPlaneSection.tsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';

type UserPlaneSectionProps = {
  onDataChange: (data: any) => void;
  savedData?: any;
};

const UserPlaneSection: React.FC<UserPlaneSectionProps> = ({ onDataChange, savedData }) => {
  const [profileType, setProfileType] = useState(savedData?.profileType || 'Single');
  const [subscriberRange, setSubscriberRange] = useState(savedData?.subscriberRange || 'Range #1');
  const [dataType, setDataType] = useState(savedData?.dataType || 'IPERF');
  const [transportProtocol, setTransportProtocol] = useState(savedData?.transportProtocol || 'TCP');
  const [callType, setCallType] = useState(savedData?.callType || 'video');
  const [startingPort, setStartingPort] = useState(savedData?.startingPort || 5000);
  const [apnName, setApnName] = useState(savedData?.apnName || '');
  const [startDelay, setStartDelay] = useState(savedData?.startDelay || 5);
  const [duration, setDuration] = useState(savedData?.duration || 600);
  const [dataDirection, setDataDirection] = useState(savedData?.dataDirection || 'both');
  const [dlBitrate, setDlBitrate] = useState(savedData?.dlBitrate || 150);
  const [ulBitrate, setUlBitrate] = useState(savedData?.ulBitrate || 50);

  useEffect(() => {
    onDataChange({
      profileType,
      subscriberRange,
      dataType,
      transportProtocol,
      callType: dataType === 'VOLTE/VILTE' ? callType : undefined,
      startingPort,
      apnName,
      startDelay,
      duration,
      dataDirection,
      dlBitrate: dataDirection === 'both' ? dlBitrate : undefined,
      ulBitrate: dataDirection === 'both' ? ulBitrate : undefined,
    });
  }, [profileType, subscriberRange, dataType, transportProtocol, callType, startingPort, apnName, startDelay, duration, dataDirection, dlBitrate, ulBitrate, onDataChange]);

  return (
    <div className="section userplane-section">
      <h2>User Plane Section</h2>
      <div className="section-header">
        <InputField
          type="dropdown"
          label="Profile Type"
          id="profileType"
          options={[
            { label: 'Single', value: 'Single' },
            { label: 'Mixed', value: 'Mixed' },
          ]}
          defaultValue={profileType}
          onChange={setProfileType}
        />
      </div>
      <div className="section-main">
        <InputField
          type="string"
          label="Subscriber Range"
          id="subscriberRange"
          defaultValue={subscriberRange}
          onChange={setSubscriberRange}
        />
        <InputField
          type="dropdown"
          label="Data Type"
          id="dataType"
          options={[
            { label: 'IPERF', value: 'IPERF' },
            { label: 'VOLTE/VILTE', value: 'VOLTE/VILTE' },
          ]}
          defaultValue={dataType}
          onChange={setDataType}
        />
        <InputField
          type="dropdown"
          label="Transport Protocol"
          id="transportProtocol"
          options={[
            { label: 'TCP', value: 'TCP' },
            { label: 'UDP', value: 'UDP' },
          ]}
          defaultValue={transportProtocol}
          onChange={setTransportProtocol}
        />
        {dataType === 'VOLTE/VILTE' && (
          <InputField
            type="dropdown"
            label="Call Type"
            id="callType"
            options={[
              { label: 'video', value: 'video' },
              { label: 'audio', value: 'audio' },
            ]}
            defaultValue={callType}
            onChange={setCallType}
          />
        )}
        <InputField
          type="numeric"
          label="Starting Port"
          id="startingPort"
          defaultValue={startingPort}
          onChange={(val) => setStartingPort(Number(val))}
        />
        <InputField
          type="string"
          label="APN Name"
          id="apnName"
          defaultValue={apnName}
          onChange={setApnName}
        />
        <InputField
          type="numeric"
          label="Start Delay (sec)"
          id="startDelay"
          defaultValue={startDelay}
          onChange={(val) => setStartDelay(Number(val))}
        />
        <InputField
          type="numeric"
          label="Duration (sec)"
          id="duration"
          defaultValue={duration}
          onChange={(val) => setDuration(Number(val))}
        />
        <InputField
          type="dropdown"
          label="Data Direction"
          id="dataDirection"
          options={[
            { label: 'both', value: 'both' },
            { label: 'Downlink', value: 'Downlink' },
            { label: 'Uplink', value: 'Uplink' },
          ]}
          defaultValue={dataDirection}
          onChange={setDataDirection}
        />
        {dataDirection === 'both' && (
          <>
            <InputField
              type="numeric"
              label="DL Bitrate"
              id="dlBitrate"
              defaultValue={dlBitrate}
              onChange={(val) => setDlBitrate(Number(val))}
            />
            <InputField
              type="numeric"
              label="UL Bitrate"
              id="ulBitrate"
              defaultValue={ulBitrate}
              onChange={(val) => setUlBitrate(Number(val))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserPlaneSection;
