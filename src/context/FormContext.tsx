
// =====This file creates a global context for storing and managing form data.====

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Define types for cell data (4G and 5G)
interface BaseCell {
  id: number;
  cellType: string;
  duplexMode: string;
  band: string;
  dlEarfcn: number;
  ulEarfcn: number;
}

interface FourGCell extends BaseCell {
  ratType: "4G";
  mobility: string;
}

interface FiveGCell extends BaseCell {
  ratType: "5G";
  mobility: string;
  ssbNrArfcn?: number;
}

// Discriminated union for cell types
export type CellType = FourGCell | FiveGCell;

export interface FormDataType {
  cells?: CellType[];
  subscriber?: any;
  userPlane?: any;
  traffic?: any;
  mobility?: any;
  settings?: any;
}

interface FormContextProps {
  formData: FormDataType;
  updateFormData: (section: keyof FormDataType, data: any) => void;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  // On page load, clear localStorage so that defaults are used.
  useEffect(() => {
    localStorage.removeItem("formData");
  }, []);

  // Always initialize with default empty object, do not load from localStorage.
  const [formData, setFormData] = useState<FormDataType>({});

  // Function to update form data and store the entire formData in localStorage.
  const updateFormData = (section: keyof FormDataType, data: any) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [section]: data };
      localStorage.setItem("formData", JSON.stringify(updatedData));
      console.log(`Updated section: ${section}`, data);
      return updatedData;
    });
  };

  // Function to reset form data (clears state and localStorage).
  const resetFormData = () => {
    setFormData({});
    localStorage.removeItem("formData");
    console.log("Form data reset.");
  };

  // Log formData changes for debugging.
  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within a FormProvider");
  return context;
};
