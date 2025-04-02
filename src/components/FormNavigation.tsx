// src/components/FormNavigation.tsx
import React from 'react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSubmit,
}) => {
  return (
    <div className="form-navigation">
      {currentStep > 0 && (
        <button className="nav-button back-button" onClick={onBack}>
          Back
        </button>
      )}
      {currentStep < totalSteps - 1 && (
        <button className="nav-button next-button" onClick={onNext}>
          Next
        </button>
      )}
      {currentStep === totalSteps - 1 && onSubmit && (
        <button className="nav-button submit-button" onClick={onSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
