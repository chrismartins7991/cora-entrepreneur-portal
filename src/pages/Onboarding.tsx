import { useState } from "react";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { WelcomeStep } from "@/components/onboarding/steps/WelcomeStep";
import { BusinessProfileStep } from "@/components/onboarding/steps/BusinessProfileStep";
import { GoalsStep } from "@/components/onboarding/steps/GoalsStep";
import { ResourcesStep } from "@/components/onboarding/steps/ResourcesStep";
import { QuickWinsStep } from "@/components/onboarding/steps/QuickWinsStep";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <BusinessProfileStep />;
      case 3:
        return <GoalsStep />;
      case 4:
        return <ResourcesStep />;
      case 5:
        return <QuickWinsStep />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      isLastStep={currentStep === totalSteps}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}