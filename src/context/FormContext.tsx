// // // src/context/FormContext.tsx
// // import React, { createContext, useState, ReactNode, useContext } from "react";

// // export interface FormDataType {
// //   cell?: any;
// //   subscriber?: any;
// //   userPlane?: any;
// //   traffic?: any;
// //   mobility?: any;
// //   settings?: any;
// // }

// // interface FormContextProps {
// //   formData: FormDataType;
// //   updateFormData: (section: keyof FormDataType, data: any) => void;
// // }

// // const FormContext = createContext<FormContextProps | undefined>(undefined);

// // export const FormProvider = ({ children }: { children: ReactNode }) => {
// //   const [formData, setFormData] = useState<FormDataType>({});

// //   const updateFormData = (section: keyof FormDataType, data: any) => {
// //     setFormData((prev) => ({ ...prev, [section]: data }));
// //   };

// //   return (
// //     <FormContext.Provider value={{ formData, updateFormData }}>
// //       {children}
// //     </FormContext.Provider>
// //   );
// // };

// // export const useFormContext = () => {
// //   const context = useContext(FormContext);
// //   if (!context) {
// //     throw new Error("useFormContext must be used within a FormProvider");
// //   }
// //   return context;
// // };




// // ================adding the new code============

// // src/context/FormContext.tsx
// import React, { createContext, useState, ReactNode, useContext } from "react";

// export interface FormDataType {
//   cell?: any;
//   subscriber?: any;
//   userPlane?: any;
//   traffic?: any;
//   mobility?: any;
//   settings?: any;
// }

// interface FormContextProps {
//   formData: FormDataType;
//   updateFormData: (section: keyof FormDataType, data: any) => void;
// }

// const FormContext = createContext<FormContextProps | undefined>(undefined);

// export const FormProvider = ({ children }: { children: ReactNode }) => {
//   const [formData, setFormData] = useState<FormDataType>({});

//   const updateFormData = (section: keyof FormDataType, data: any) => {
//     setFormData((prev) => ({ ...prev, [section]: data }));
//     localStorage.setItem(section, JSON.stringify(data));
//     console.log(`Section ${section} data:`, data);
//   };

//   return (
//     <FormContext.Provider value={{ formData, updateFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   if (!context) throw new Error("useFormContext must be used within a FormProvider");
//   return context;
// };




// ======================adding new code==================

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Define the structure for form data
export interface FormDataType {
  cells?: Array<{
    id: number;
    ratType: string;
    mobility: string;
    cellType: string;
    duplexMode: string;
    band: string;
    dlEarfcn: number;
    ulEarfcn: number;
    ssbNrArfcn?: number;
  }>;
  subscriber?: any;
  userPlane?: any;
  traffic?: any;
  mobility?: any;
  settings?: any;
}

// Define the context interface
interface FormContextProps {
  formData: FormDataType;
  updateFormData: (section: keyof FormDataType, data: any) => void;
  resetFormData: () => void;
}

// Create context
const FormContext = createContext<FormContextProps | undefined>(undefined);

// Provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with saved data from localStorage (if available)
  const [formData, setFormData] = useState<FormDataType>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  });

  // Function to update form data
  const updateFormData = (section: keyof FormDataType, data: any) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [section]: data };
      localStorage.setItem("formData", JSON.stringify(updatedData)); // Save the entire formData
      console.log(`Updated section: ${section}`, data);
      return updatedData;
    });
  };

  // Function to reset form data
  const resetFormData = () => {
    setFormData({});
    localStorage.removeItem("formData");
    console.log("Form data reset.");
  };

  // Effect to log formData whenever it updates
  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within a FormProvider");
  return context;
};
