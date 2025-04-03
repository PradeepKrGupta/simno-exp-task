// // src/components/sections/CellSection.tsx
// import React, { useState, useEffect } from "react";
// import Dropdown from "../common/Dropdown";
// import InputField from "../common/InputField";
// import NumberInput from "../common/NumberInput";
// import { cellDefaults, ratTypeOptions, duplexOptions, bandOptionsFDD, bandOptionsTDD } from "../../config/formConfig";
// import { useFormContext } from "../../context/FormContext";
// import { validateCellSection } from "../../utils/formUtils";

// interface CellSectionProps {
//   onNext: () => void;
// }

// const CellSection: React.FC<CellSectionProps> = ({ onNext }) => {
//   const { formData, updateFormData } = useFormContext();
//   const saved = formData.cell || {};

//   // Header fields
//   const [ratType, setRatType] = useState<string>(saved.ratType || "4G");
//   const [mobility, setMobility] = useState<string>(saved.mobility || "No");

//   // Main fields – initialize based on saved data or default values for 4G
//   const [cellType, setCellType] = useState<string>(saved.cellType || cellDefaults["4G"].cellType);
//   const [duplexMode, setDuplexMode] = useState<string>(saved.duplexMode || cellDefaults["4G"].duplexMode);
//   const [band, setBand] = useState<string>(saved.band || cellDefaults["4G"].band);
//   const [dlEarfcn, setDlEarfcn] = useState<number>(saved.dlEarfcn || cellDefaults["4G"].dlEarfcn);
//   const [ulEarfcn, setUlEarfcn] = useState<number>(saved.ulEarfcn || cellDefaults["4G"].ulEarfcn);
//   const [ssbNrArfcn, setSsbNrArfcn] = useState<number>(saved.ssbNrArfcn || cellDefaults["5G"].ssbNrArfcn);

//   // Update main fields when ratType changes
//   useEffect(() => {
//     if (ratType === "4G") {
//       setCellType(cellDefaults["4G"].cellType);
//       setDuplexMode(cellDefaults["4G"].duplexMode);
//       setBand(cellDefaults["4G"].band);
//       setDlEarfcn(cellDefaults["4G"].dlEarfcn);
//       setUlEarfcn(cellDefaults["4G"].ulEarfcn);
//     } else if (ratType === "5G") {
//       setCellType(cellDefaults["5G"].cellType);
//       setDuplexMode(cellDefaults["5G"].duplexMode);
//       setBand(cellDefaults["5G"].band);
//       setDlEarfcn(cellDefaults["5G"].dlEarfcn);
//       setUlEarfcn(cellDefaults["5G"].ulEarfcn);
//       setSsbNrArfcn(cellDefaults["5G"].ssbNrArfcn);
//     } else if (ratType === "5G:NSA") {
//       setCellType(cellDefaults["4G"].cellType);
//       setDuplexMode(cellDefaults["4G"].duplexMode);
//       setBand(cellDefaults["4G"].band);
//       setDlEarfcn(cellDefaults["4G"].dlEarfcn);
//       setUlEarfcn(cellDefaults["4G"].ulEarfcn);

//       setCellType(cellDefaults["5G"].cellType);
//       setDuplexMode(cellDefaults["5G"].duplexMode);
//       setBand(cellDefaults["5G"].band);
//       setDlEarfcn(cellDefaults["5G"].dlEarfcn);
//       setUlEarfcn(cellDefaults["5G"].ulEarfcn);
//       setSsbNrArfcn(cellDefaults["5G"].ssbNrArfcn);
//     }
//   }, [ratType]);

//   const handleNext = () => {
//     const data = { ratType, mobility, cellType, duplexMode, band, dlEarfcn, ulEarfcn, ssbNrArfcn };
//     const validation = validateCellSection(data);
//     if (validation === true) {
//       updateFormData("cell", data);
//       onNext();
//     } else {
//       alert(validation);
//     }
//   };

//   return (
//     <div className="section-container">
//       <h2>Cell Configuration</h2>
//       <div className="section-header">
//         <Dropdown label="RAT Type" value={ratType} options={ratTypeOptions} onChange={(e) => setRatType(e.target.value)} />
//         <Dropdown label="Mobility" value={mobility} options={["Yes", "No"]} onChange={(e) => setMobility(e.target.value)} />
//       </div>
//       <div className="section-main">
//         <InputField label="Cell Type" value={cellType} onChange={(e) => setCellType(e.target.value)} />
//         <Dropdown label="Duplex Mode" value={duplexMode} options={duplexOptions} onChange={(e) => setDuplexMode(e.target.value)} />
//         <Dropdown
//           label="Band"
//           value={band}
//           options={duplexMode === "FDD" ? bandOptionsFDD : bandOptionsTDD}
//           onChange={(e) => setBand(e.target.value)}
//         />
//         <NumberInput label="DL EARFCN" value={dlEarfcn} onChange={(e) => setDlEarfcn(Number(e.target.value))} />
//         <NumberInput label="UL EARFCN" value={ulEarfcn} onChange={(e) => setUlEarfcn(Number(e.target.value))} />
//         {ratType === "5G" && (
//           <NumberInput label="SSB NR-ARFCN" value={ssbNrArfcn} onChange={(e) => setSsbNrArfcn(Number(e.target.value))} />
//         )}
//       </div>
//       <button className="next-button" onClick={handleNext}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default CellSection;




// =====================adding the new code=================

// src/components/sections/CellSection.tsx
import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import InputField from "../common/InputField";
import NumberInput from "../common/NumberInput";
import {
  cellDefaults,
  ratTypeOptions,
  duplexOptions,
  bandOptionsFDD,
  bandOptionsTDD,
} from "../../config/formConfig";
import { useFormContext } from "../../context/FormContext";
import { validateCellSection } from "../../utils/formUtils";

interface CellSectionProps {
  onNext: () => void;
}

interface CellType {
  id: number;
  ratType: string;
  mobility: string;
  cellType: string;
  duplexMode: string;
  band: string;
  dlEarfcn: number;
  ulEarfcn: number;
  ssbNrArfcn?: number;
}

const MAX_CELLS = 3; // Limit to 3 cells

const CellSection: React.FC<CellSectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const savedCells: CellType[] = formData.cells || []; // Retrieve saved cells

  // Initialize cells from saved data or default 4G cell
  const [cells, setCells] = useState<CellType[]>(
    savedCells.length > 0 ? savedCells : [{ ...cellDefaults["4G"], id: 1 }]
  );

  useEffect(() => {
    if (cells.length === 0) {
      setCells([{ ...cellDefaults["4G"], id: 1 }]);
    }
  }, [cells.length]);

  const handleAddCell = () => {
    if (cells.length < MAX_CELLS) {
      setCells([...cells, { ...cellDefaults["4G"], id: cells.length + 1 }]);
    }
  };

  const handleCellChange = <K extends keyof CellType>(
    index: number,
    key: K,
    value: CellType[K]
  ) => {
    setCells((prevCells) => {
      const updatedCells = [...prevCells];
      // Update the field in the cell
      updatedCells[index] = { ...updatedCells[index], [key]: value };

      // If changing RAT Type, update the cell defaults accordingly
      if (key === "ratType") {
        if (value === "4G") {
          updatedCells[index] = { ...cellDefaults["4G"], id: index + 1 };
        } else if (value === "5G") {
          updatedCells[index] = { ...cellDefaults["5G"], id: index + 1 };
        } else if (value === "5G:NSA") {
          // For NSA, assign a 4G cell for the current index...
          updatedCells[index] = { ...cellDefaults["4G"], id: index + 1 };
          // ...and if we can add another cell, add a corresponding 5G cell.
          if (updatedCells.length < MAX_CELLS) {
            updatedCells.push({
              ...cellDefaults["5G"],
              id: updatedCells.length + 1,
              ratType: "5G", // explicitly set for the new cell
              mobility: "No", // default value
            });
          }
        }
      }
      return updatedCells;
    });
  };

  const handleNext = () => {
    for (let cell of cells) {
      const validation = validateCellSection(cell);
      if (validation !== true) {
        // Instead of popup, you might want to show an inline error message.
        // For now, we'll use alert (or you can remove the alert to simply not block).
        alert(validation);
        return;
      }
    }
    // Save cells to context (and hence to localStorage)
    updateFormData("cells", cells);
    onNext();
  };

  return (
    <div className="section-container">
      <h2>Cell Configuration</h2>
      {cells.map((cell, index) => (
        <div key={cell.id} className="cell-container">
          <h3>Cell {index + 1}</h3>
          <Dropdown
            label="RAT Type"
            value={cell.ratType}
            options={ratTypeOptions}
            onChange={(e) => handleCellChange(index, "ratType", e.target.value)}
          />
          <Dropdown
            label="Mobility"
            value={cell.mobility}
            options={["Yes", "No"]}
            onChange={(e) => handleCellChange(index, "mobility", e.target.value)}
          />
          <InputField
            label="Cell Type"
            value={cell.cellType}
            onChange={(e) => handleCellChange(index, "cellType", e.target.value)}
          />
          <Dropdown
            label="Duplex Mode"
            value={cell.duplexMode}
            options={duplexOptions}
            onChange={(e) => handleCellChange(index, "duplexMode", e.target.value)}
          />
          <Dropdown
            label="Band"
            value={cell.band}
            options={cell.duplexMode === "FDD" ? bandOptionsFDD : bandOptionsTDD}
            onChange={(e) => handleCellChange(index, "band", e.target.value)}
          />
          <NumberInput
            label="DL EARFCN"
            value={cell.dlEarfcn}
            onChange={(e) => handleCellChange(index, "dlEarfcn", Number(e.target.value))}
          />
          <NumberInput
            label="UL EARFCN"
            value={cell.ulEarfcn}
            onChange={(e) => handleCellChange(index, "ulEarfcn", Number(e.target.value))}
          />
          {cell.ratType === "5G" && (
            <NumberInput
              label="SSB NR-ARFCN"
              value={cell.ssbNrArfcn || 0}
              onChange={(e) => handleCellChange(index, "ssbNrArfcn", Number(e.target.value))}
            />
          )}
        </div>
      ))}

      {/* Add new cell button at bottom left */}
      {cells.length < MAX_CELLS && (
        <button className="add-cell-button" onClick={handleAddCell}>
          ➕ Add Cell
        </button>
      )}

      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default CellSection;



