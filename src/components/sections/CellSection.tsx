// src/components/sections/CellSection.tsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import { defaultCellValues, ratTypeOptions, mobilityOptions } from '../../config/formConfig';

type CellSectionProps = {
  onDataChange: (data: any) => void;
  savedData?: any;
};

const CellSection: React.FC<CellSectionProps> = ({ onDataChange, savedData }) => {
  const [ratType, setRatType] = useState(savedData?.ratType || '4G');
  const [mobility, setMobility] = useState(savedData?.mobility || 'no');
  const [cellData, setCellData] = useState(savedData?.cellData || defaultCellValues['4G']);

  useEffect(() => {
    setCellData(defaultCellValues[ratType]);
  }, [ratType]);

  useEffect(() => {
    onDataChange({ ratType, mobility, cellData });
  }, [ratType, mobility, cellData, onDataChange]);

  return (
    <div className="section cell-section">
      <h2>Cell Section</h2>
      <div className="section-header">
        <InputField
          type="dropdown"
          label="RAT Type"
          id="ratType"
          options={ratTypeOptions}
          defaultValue={ratType}
          onChange={setRatType}
        />
        <InputField
          type="dropdown"
          label="Mobility"
          id="mobility"
          options={mobilityOptions}
          defaultValue={mobility}
          onChange={setMobility}
        />
      </div>
      <div className="section-main">
        <InputField
          type="string"
          label="Cell Type"
          id="cellType"
          defaultValue={cellData.cellType}
          onChange={(val) =>
            setCellData((prev: any) => ({ ...prev, cellType: val }))
          }
        />
        <InputField
          type="dropdown"
          label="Duplex Mode"
          id="duplexMode"
          options={[
            { label: 'FDD', value: 'FDD' },
            { label: 'TDD', value: 'TDD' },
          ]}
          defaultValue={cellData.duplexMode}
          onChange={(val) =>
            setCellData((prev: any) => ({ ...prev, duplexMode: val }))
          }
        />
        <InputField
          type="dropdown"
          label="Band"
          id="band"
          options={[
            { label: 'n1', value: 'n1' },
            { label: 'n2', value: 'n2' },
          ]}
          defaultValue={cellData.band}
          onChange={(val) =>
            setCellData((prev: any) => ({ ...prev, band: val }))
          }
        />
        <InputField
          type="numeric"
          label={cellData.duplexMode === 'FDD' ? 'DL EARFCN' : 'DL-NR-ARFCN'}
          id="dlEarfcn"
          defaultValue={cellData.dlEarfcn}
          onChange={(val) =>
            setCellData((prev: any) => ({ ...prev, dlEarfcn: Number(val) }))
          }
        />
        <InputField
          type="numeric"
          label={cellData.duplexMode === 'FDD' ? 'UL EARFCN' : 'UL-NR-ARFCN'}
          id="ulEarfcn"
          defaultValue={cellData.ulEarfcn}
          onChange={(val) =>
            setCellData((prev: any) => ({ ...prev, ulEarfcn: Number(val) }))
          }
        />
        {ratType === '5G' && (
          <InputField
            type="numeric"
            label="SSB NR-ARFCN"
            id="ssbNrArfcn"
            defaultValue={cellData.ssbNrArfcn}
            onChange={(val) =>
              setCellData((prev: any) => ({ ...prev, ssbNrArfcn: Number(val) }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default CellSection;
