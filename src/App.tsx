// src/App.tsx
import React, { useState } from 'react';
import CellSection from './components/sections/CellSection';
import SubscriberSection from './components/sections/SubscriberSection';
import UserPlaneSection from './components/sections/UserPlaneSection';
import TrafficSection from './components/sections/TrafficSection';
import MobilitySection from './components/sections/MobilitySection';
import SettingsSection from './components/sections/SettingsSection';
import FormNavigation from './components/FormNavigation';

const App: React.FC = () => {
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});

  const updateSectionData = (sectionKey: string, data: any) => {
    setFormData((prev: any) => ({ ...prev, [sectionKey]: data }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    localStorage.setItem('allFormData', JSON.stringify(formData));
    alert('Form Submitted! Check console for output.');
  };

  const renderSection = () => {
    switch (currentStep) {
      case 0:
        return (
          <CellSection
            onDataChange={(data: any) => updateSectionData('cellSectionData', data)}
            savedData={formData.cellSectionData}
          />
        );
      case 1:
        return (
          <SubscriberSection
            onDataChange={(data: any) => updateSectionData('subscriberSectionData', data)}
            savedData={formData.subscriberSectionData}
          />
        );
      case 2:
        return (
          <UserPlaneSection
            onDataChange={(data: any) => updateSectionData('userPlaneSectionData', data)}
            savedData={formData.userPlaneSectionData}
          />
        );
      case 3:
        return (
          <TrafficSection
            onDataChange={(data: any) => updateSectionData('trafficSectionData', data)}
            savedData={formData.trafficSectionData}
          />
        );
      case 4:
        return (
          <MobilitySection
            onDataChange={(data: any) => updateSectionData('mobilitySectionData', data)}
            savedData={formData.mobilitySectionData}
          />
        );
      case 5:
        return (
          <SettingsSection
            onDataChange={(data: any) => updateSectionData('settingsSectionData', data)}
            savedData={formData.settingsSectionData}
          />
        );
      default:
        return <div>Form Completed!</div>;
    }
  };

  return (
    <div className="app">
      {renderSection()}
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={currentStep === totalSteps - 1 ? handleSubmit : handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
