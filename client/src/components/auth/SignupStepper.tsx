import React, { useState, forwardRef } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { AccountDetailsStep } from './signup/AccountDetailsStep';
import { OtpVerificationStep } from './signup/OtpVerificationStep';
import { RoleSelectionStep } from './signup/RoleSelectionStep';
import { PlanSelectionStep } from './signup/PlanSelectionStep';
import { SuccessStep } from './signup/SuccessStep';

interface SignupStepperProps {
  onSuccess: () => void;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  role: 'personal' | 'professional' | 'team' | '';
  plan: 'free' | 'pro-monthly' | 'pro-annual' | 'team' | '';
  otp: string;
}

const steps = [
  { id: 1, title: 'Account Details', description: 'Basic information' },
  { id: 2, title: 'Verify Email', description: 'Enter OTP code' },
  { id: 3, title: 'Choose Role', description: 'How will you use CodeEditor?' },
  { id: 4, title: 'Select Plan', description: 'Choose your plan' },
  { id: 5, title: 'Success', description: 'Welcome aboard!' }
];

export const SignupStepper = forwardRef<HTMLInputElement, SignupStepperProps>(({ onSuccess }, ref) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    role: '',
    plan: '',
    otp: ''
  });

  const updateFormData = (updates: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep || step === currentStep - 1) {
      setCurrentStep(step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountDetailsStep
            ref={ref}
            data={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <OtpVerificationStep
            email={formData.email}
            data={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <RoleSelectionStep
            data={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <PlanSelectionStep
            data={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SuccessStep
            data={formData}
            onComplete={onSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep + 1}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                  step.id < currentStep
                    ? 'bg-success border-success text-success-foreground'
                    : step.id === currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-border text-muted-foreground bg-card'
                } ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                aria-label={`Step ${step.id}: ${step.title}`}
              >
                {step.id < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step.id < currentStep ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-card-foreground">
            {steps[currentStep - 1]?.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="animate-fade-in">
        {renderStep()}
      </div>
    </div>
  );
});