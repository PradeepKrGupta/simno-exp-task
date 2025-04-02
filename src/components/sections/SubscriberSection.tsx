// src/components/sections/SubscriberSection.tsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';

type SubscriberSectionProps = {
  onDataChange: (data: any) => void;
  savedData?: any;
};

const SubscriberSection: React.FC<SubscriberSectionProps> = ({ onDataChange, savedData }) => {
  const [totalUEs, setTotalUEs] = useState<number>(savedData?.totalUEs || 0);
  const [ues, setUes] = useState<string>(savedData?.ues || '');
  const [startingSupi, setStartingSupi] = useState(savedData?.startingSupi || '001010123456001');
  const [sharedKey, setSharedKey] = useState(savedData?.sharedKey || '00112233445566778899aabbccddeeff');
  const [mncDigits, setMncDigits] = useState<number>(savedData?.mncDigits || 2);

  const generateUEs = () => {
    const ueList = [];
    for (let i = 1; i <= totalUEs; i++) {
      ueList.push(`Cell #${i}`);
    }
    setUes(ueList.join(', '));
  };

  useEffect(() => {
    onDataChange({ totalUEs, ues, startingSupi, sharedKey, mncDigits });
  }, [totalUEs, ues, startingSupi, sharedKey, mncDigits, onDataChange]);

  return (
    <div className="section subscriber-section">
      <h2>Subscriber Section</h2>
      <div className="section-header">
        <InputField
          type="numeric"
          label="Total # of UEs"
          id="totalUEs"
          defaultValue={totalUEs}
          onChange={(val) => setTotalUEs(Number(val))}
        />
        <button onClick={generateUEs}>Generate UE Ranges</button>
      </div>
      <div className="section-main">
        <InputField
          type="string"
          label="# of UEs (Serving Cells)"
          id="ues"
          defaultValue={ues}
          onChange={() => {}}
        />
        <InputField
          type="string"
          label="Starting SUPI"
          id="startingSupi"
          defaultValue={startingSupi}
          onChange={setStartingSupi}
        />
        <InputField
          type="string"
          label="Shared Key"
          id="sharedKey"
          defaultValue={sharedKey}
          onChange={setSharedKey}
        />
        <InputField
          type="numeric"
          label="MNC Digits"
          id="mncDigits"
          defaultValue={mncDigits}
          onChange={(val) => setMncDigits(Number(val))}
        />
      </div>
    </div>
  );
};

export default SubscriberSection;
