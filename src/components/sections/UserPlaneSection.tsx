// src/components/sections/UserPlaneSection.tsx
import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import InputField from "../common/InputField";
import NumberInput from "../common/NumberInput";
import { userPlaneDefaults } from "../../config/formConfig";
import { useFormContext } from "../../context/FormContext";

interface UserPlaneSectionProps {
  onNext: () => void;
}

const UserPlaneSection: React.FC<UserPlaneSectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const saved = formData.userPlane || {};

  const [profileType, setProfileType] = useState<string>(saved.profileType || userPlaneDefaults.profileType);
  const [subscriberRange, setSubscriberRange] = useState<string>(saved.subscriberRange || userPlaneDefaults.subscriberRange);
  const [dataType, setDataType] = useState<string>(saved.dataType || userPlaneDefaults.dataType);
  const [transportProtocol, setTransportProtocol] = useState<string>(saved.transportProtocol || userPlaneDefaults.transportProtocol);
  const [startingPort, setStartingPort] = useState<number>(saved.startingPort || userPlaneDefaults.startingPort);
  const [apnName, setApnName] = useState<string>(saved.apnName || userPlaneDefaults.apnName);
  const [startDelay, setStartDelay] = useState<number>(saved.startDelay || userPlaneDefaults.startDelay);
  const [duration, setDuration] = useState<number>(saved.duration || userPlaneDefaults.duration);
  const [dataDirection, setDataDirection] = useState<string>(saved.dataDirection || userPlaneDefaults.dataDirection);
  const [dlBitrate, setDlBitrate] = useState<number>(saved.dlBitrate || userPlaneDefaults.dlBitrate);
  const [ulBitrate, setUlBitrate] = useState<number>(saved.ulBitrate || userPlaneDefaults.ulBitrate);
  const [callType, setCallType] = useState<string>(saved.callType || "video");

  const handleNext = () => {
    const data = {
      profileType,
      subscriberRange,
      dataType,
      transportProtocol,
      startingPort,
      apnName,
      startDelay,
      duration,
      dataDirection,
      dlBitrate: dataDirection === "both" ? dlBitrate : undefined,
      ulBitrate: dataDirection === "both" ? ulBitrate : undefined,
      callType: dataType === "VOLTE/VILTE" ? callType : undefined,
    };
    updateFormData("userPlane", data);
    onNext();
  };

  useEffect(() => {
    updateFormData("userPlane", {
      profileType,
      subscriberRange,
      dataType,
      transportProtocol,
      startingPort,
      apnName,
      startDelay,
      duration,
      dataDirection,
      dlBitrate,
      ulBitrate,
      callType,
    });
  }, [
    profileType,
    subscriberRange,
    dataType,
    transportProtocol,
    startingPort,
    apnName,
    startDelay,
    duration,
    dataDirection,
    dlBitrate,
    ulBitrate,
    callType,
    updateFormData,
  ]);

  return (
    <div className="section-container">
      <h2>User Plane Configuration</h2>
      <Dropdown label="Profile Type" value={profileType} options={["Single", "Mixed"]} onChange={(e) => setProfileType(e.target.value)} />
      <InputField label="Subscriber Range" value={subscriberRange} onChange={(e) => setSubscriberRange(e.target.value)} />
      <Dropdown label="Data Type" value={dataType} options={["IPERF", "VOLTE/VILTE"]} onChange={(e) => setDataType(e.target.value)} />
      <Dropdown label="Transport Protocol" value={transportProtocol} options={["TCP", "UDP"]} onChange={(e) => setTransportProtocol(e.target.value)} />
      {dataType === "VOLTE/VILTE" && (
        <Dropdown label="Call Type" value={callType} options={["video", "audio"]} onChange={(e) => setCallType(e.target.value)} />
      )}
      <NumberInput label="Starting Port" value={startingPort} onChange={(e) => setStartingPort(Number(e.target.value))} />
      <InputField label="APN Name" value={apnName} onChange={(e) => setApnName(e.target.value)} />
      <NumberInput label="Start Delay (sec)" value={startDelay} onChange={(e) => setStartDelay(Number(e.target.value))} />
      <NumberInput label="Duration (sec)" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      <Dropdown label="Data Direction" value={dataDirection} options={["both", "Downlink", "Uplink"]} onChange={(e) => setDataDirection(e.target.value)} />
      {dataDirection === "both" && (
        <>
          <NumberInput label="DL Bitrate" value={dlBitrate} onChange={(e) => setDlBitrate(Number(e.target.value))} />
          <NumberInput label="UL Bitrate" value={ulBitrate} onChange={(e) => setUlBitrate(Number(e.target.value))} />
        </>
      )}
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default UserPlaneSection;
