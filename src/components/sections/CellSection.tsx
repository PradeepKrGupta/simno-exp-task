
// // src/components/sections/CellSection.tsx
// import React, { useState, useEffect } from "react";
// import Dropdown from "../common/Dropdown";
// import InputField from "../common/InputField";
// import NumberInput from "../common/NumberInput";
// import {
//   cellDefaults,
//   ratTypeOptions,
//   duplexOptions,
//   bandOptionsFDD,
//   bandOptionsTDD,
// } from "../../config/formConfig";
// import { useFormContext } from "../../context/FormContext";
// import { validateCellSection } from "../../utils/formUtils";

// interface CellSectionProps {
//   onNext: () => void;
// }

// interface CellType {
//   id: number;
//   ratType: string;
//   mobility: string;
//   cellType: string;
//   duplexMode: string;
//   band: string;
//   dlEarfcn: number;
//   ulEarfcn: number;
//   ssbNrArfcn?: number;
// }

// const MAX_CELLS = 3; // Limit to 3 cells

// const CellSection: React.FC<CellSectionProps> = ({ onNext }) => {
//   const { formData, updateFormData } = useFormContext();
//   const savedCells: CellType[] = formData.cells || []; // Retrieve saved cells

//   // Initialize cells from saved data or default 4G cell
//   const [cells, setCells] = useState<CellType[]>(
//     savedCells.length > 0 ? savedCells : [{ ...cellDefaults["4G"], id: 1 }]
//   );

//   useEffect(() => {
//     if (cells.length === 0) {
//       setCells([{ ...cellDefaults["4G"], id: 1 }]);
//     }
//   }, [cells.length]);

//   const handleAddCell = () => {
//     if (cells.length < MAX_CELLS) {
//       setCells([...cells, { ...cellDefaults["4G"], id: cells.length + 1 }]);
//     }
//   };

//   const handleCellChange = <K extends keyof CellType>(
//     index: number,
//     key: K,
//     value: CellType[K]
//   ) => {
//     setCells((prevCells) => {
//       const updatedCells = [...prevCells];
//       // Update the field in the cell
//       updatedCells[index] = { ...updatedCells[index], [key]: value };

//       // If changing RAT Type, update the cell defaults accordingly
//       if (key === "ratType") {
//         if (value === "4G") {
//           updatedCells[index] = { ...cellDefaults["4G"], id: index + 1 };
//         } else if (value === "5G") {
//           updatedCells[index] = { ...cellDefaults["5G"], id: index + 1 };
//         } else if (value === "5G:NSA") {
//           // For NSA, assign a 4G cell for the current index...
//           updatedCells[index] = { ...cellDefaults["4G"], id: index + 1 };
//           // ...and if we can add another cell, add a corresponding 5G cell.
//           if (updatedCells.length < MAX_CELLS) {
//             updatedCells.push({
//               ...cellDefaults["5G"],
//               id: updatedCells.length + 1,
//               ratType: "5G", // explicitly set for the new cell
//               mobility: "No", // default value
//             });
//           }
//         }
//       }
//       return updatedCells;
//     });
//   };

//   const handleNext = () => {
//     for (let cell of cells) {
//       const validation = validateCellSection(cell);
//       if (validation !== true) {
//         // Instead of popup, you might want to show an inline error message.
//         // For now, we'll use alert (or you can remove the alert to simply not block).
//         alert(validation);
//         return;
//       }
//     }
//     // Save cells to context (and hence to localStorage)
//     updateFormData("cells", cells);
//     onNext();
//   };

//   return (
//     <div className="section-container">
//       <h2>Cell Configuration</h2>
//       {cells.map((cell, index) => (
//         <div key={cell.id} className="cell-container">
//           <h3>Cell {index + 1}</h3>
//           <Dropdown
//             label="RAT Type"
//             value={cell.ratType}
//             options={ratTypeOptions}
//             onChange={(e) => handleCellChange(index, "ratType", e.target.value)}
//           />
//           <Dropdown
//             label="Mobility"
//             value={cell.mobility}
//             options={["Yes", "No"]}
//             onChange={(e) => handleCellChange(index, "mobility", e.target.value)}
//           />
//           <InputField
//             label="Cell Type"
//             value={cell.cellType}
//             onChange={(e) => handleCellChange(index, "cellType", e.target.value)}
//           />
//           <Dropdown
//             label="Duplex Mode"
//             value={cell.duplexMode}
//             options={duplexOptions}
//             onChange={(e) => handleCellChange(index, "duplexMode", e.target.value)}
//           />
//           <Dropdown
//             label="Band"
//             value={cell.band}
//             options={cell.duplexMode === "FDD" ? bandOptionsFDD : bandOptionsTDD}
//             onChange={(e) => handleCellChange(index, "band", e.target.value)}
//           />
//           <NumberInput
//             label="DL EARFCN"
//             value={cell.dlEarfcn}
//             onChange={(e) => handleCellChange(index, "dlEarfcn", Number(e.target.value))}
//           />
//           <NumberInput
//             label="UL EARFCN"
//             value={cell.ulEarfcn}
//             onChange={(e) => handleCellChange(index, "ulEarfcn", Number(e.target.value))}
//           />
//           {cell.ratType === "5G" && (
//             <NumberInput
//               label="SSB NR-ARFCN"
//               value={cell.ssbNrArfcn || 0}
//               onChange={(e) => handleCellChange(index, "ssbNrArfcn", Number(e.target.value))}
//             />
//           )}
//         </div>
//       ))}

//       {/* Add new cell button at bottom left */}
//       {cells.length < MAX_CELLS && (
//         <button className="add-cell-button" onClick={handleAddCell}>
//           ➕ Add Cell
//         </button>
//       )}

//       <button className="next-button" onClick={handleNext}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default CellSection;



// ===================adding new code===================

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

export interface CellType {
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
    savedCells.length > 0 ? savedCells : [{ ...cellDefaults["4G"], id: 1 } as CellType]
  );

  // Top header state for RAT Type and Mobility; these are independent until cells are added.
  const [ratType, setRatType] = useState<string>("4G");
  const [mobility, setMobility] = useState<string>("No");
  // Flag to disable changes if a new cell has been added
  const [isCellAdded, setIsCellAdded] = useState<boolean>(false);
  // Flag indicating whether NSA mode is active
  const [isNSASelected, setIsNSASelected] = useState<boolean>(false);

  useEffect(() => {
    if (cells.length === 0) {
      setCells([{ ...cellDefaults["4G"], id: 1 } as CellType]);
    }
  }, [cells.length]);

  // Handle change for the top header dropdown (RAT Type)
  const handleTopRatTypeChange = (value: string) => {
    if (isCellAdded) return; // Once a cell is added, disable changes to RAT Type
    setRatType(value);
    if (value === "5G:NSA") {
      setIsNSASelected(true);
      // Create two cells: one 4G and one 5G.
      setCells([
        { ...cellDefaults["4G"], id: 1 } as CellType,
        { ...cellDefaults["5G"], id: 2, ratType: "5G", mobility: "No" } as CellType,
      ]);
    } else {
      setIsNSASelected(false);
      // Set single cell with the chosen RAT type, preserving cellType if set.
      setCells([
        { ...(cellDefaults as any)[value], id: 1, cellType: cells[0]?.cellType || (cellDefaults as any)[value].cellType }
      ] as CellType[]);
    }
  };

  const handleTopMobilityChange = (value: string) => {
    setMobility(value);
    // Update mobility in all cells if needed
    setCells((prev) => prev.map((cell) => ({ ...cell, mobility: value })));
  };

  const handleAddCell = () => {
    if (cells.length < MAX_CELLS && !isNSASelected) {
      setCells([...cells, { ...cellDefaults["4G"], id: cells.length + 1 } as CellType]);
      setIsCellAdded(true);
    }
  };

  // Generic handler for cell field changes
  const handleCellChange = <K extends keyof CellType>(
    index: number,
    key: K,
    value: CellType[K]
  ) => {
    setCells((prevCells) => {
      const updatedCells = [...prevCells];
      // For RAT Type and Cell Type changes, if a cell is already added via Add Cell, do not allow changes.
      if ((key === "ratType" || key === "cellType") && isCellAdded) {
        return prevCells;
      }
      updatedCells[index] = { ...updatedCells[index], [key]: value };

      // If changing RAT Type in the cell, update defaults accordingly.
      if (key === "ratType") {
        if (value === "4G") {
          updatedCells[index] = { ...cellDefaults["4G"], id: index + 1, cellType: updatedCells[index].cellType, mobility: updatedCells[index].mobility } as CellType;
        } else if (value === "5G") {
          updatedCells[index] = { ...cellDefaults["5G"], id: index + 1, cellType: updatedCells[index].cellType, mobility: updatedCells[index].mobility } as CellType;
        } else if (value === "5G:NSA") {
          updatedCells[index] = { ...cellDefaults["4G"], id: index + 1, cellType: updatedCells[index].cellType, mobility: updatedCells[index].mobility } as CellType; // 4G cell for NSA
          if (updatedCells.length < MAX_CELLS) {
            updatedCells.push({
              ...cellDefaults["5G"],
              id: updatedCells.length + 1,
              ratType: "5G",
              mobility: updatedCells[index].mobility,
            } as CellType);
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
        alert(validation);
        return;
      }
    }
    updateFormData("cells", cells);
    onNext();
  };

  return (
    <div className="section-container">
      <h2>Cell Configuration</h2>
      {/* Top header row with RAT Type and Mobility */}
      <div className="top-header">
        <Dropdown
          label="RAT Type"
          value={ratType}
          options={ratTypeOptions}
          onChange={(e) => handleTopRatTypeChange(e.target.value)}
          disabled={isCellAdded}
        />
        <Dropdown
          label="Mobility"
          value={mobility}
          options={["Yes", "No"]}
          onChange={(e) => handleTopMobilityChange(e.target.value)}
        />
      </div>
      {/* Render each cell */}
      {cells.map((cell, index) => (
        <div key={cell.id} className="cell-container">
          <h3>Cell {index + 1}</h3>
          {/* Add Cell Type input */}
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
      {/* Add new cell button appears only if not in NSA mode */}
      {!isNSASelected && cells.length < MAX_CELLS && (
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


