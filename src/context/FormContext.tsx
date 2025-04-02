// src/context/FormContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export type FormDataType = {
  cellSectionData?: any;
  subscriberSectionData?: any;
  userPlaneSectionData?: any;
  trafficSectionData?: any;
  mobilitySectionData?: any;
  settingsSectionData?: any;
};

type FormContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
