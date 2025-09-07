import React from 'react';
import { ArrowLeft, User, Briefcase, Users, ChevronRight } from 'lucide-react';
import { SignupFormData } from '../SignupStepper';

interface RoleSelectionStepProps {
  data: SignupFormData;
  onUpdate: (updates: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const roles = [
  {
    id: 'personal' as const,
    title: 'Personal',
    description: 'For solo projects',
    icon: User,
    features: ['Personal repositories', 'Basic collaboration', 'Community support'],
    popular: false
  },
  {
    id: 'professional' as const,
    title: 'Professional',
    description: 'For freelancers',
    icon: Briefcase,
    features: ['Unlimited private repos', 'Advanced tools', 'Priority support'],
    popular: true
  },
  {
    id: 'team' as const,
    title: 'Team',
    description: 'For companies & teams',
    icon: Users,
    features: ['Team collaboration', 'Admin controls', 'Advanced security'],
    popular: false
  }
];

export const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleRoleSelect = (roleId: typeof data.role) => {
    onUpdate({ role: roleId });
  };

  const handleContinue = () => {
    if (data.role) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          How will you use CodeEditor?
        </h3>
        <p className="text-muted-foreground">
          Choose the option that best describes your use case
        </p>
      </div>

      <div className="space-y-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = data.role === role.id;
          
          return (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all group hover:border-primary/50 ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-card'
                  : 'border-border hover:bg-muted/30'
              }`}
            >
              {role.popular && (
                <div className="absolute -top-2 left-4 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-card-foreground">{role.title}</h4>
                    <span className="text-sm text-muted-foreground">— {role.description}</span>
                  </div>
                  
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`transition-colors ${
                  isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-card-foreground'
                }`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              
              {/* Radio button indicator */}
              <div className={`absolute top-4 right-4 w-4 h-4 border-2 rounded-full transition-all ${
                isSelected
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground'
              }`}>
                {isSelected && (
                  <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Help text */}
      <div className="p-3 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          💡 You can change your role anytime in your account settings
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors shadow-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!data.role}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};