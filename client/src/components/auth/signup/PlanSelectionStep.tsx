import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Zap, Star, Crown } from 'lucide-react';
import { SignupFormData } from '../SignupStepper';

interface PlanSelectionStepProps {
  data: SignupFormData;
  onUpdate: (updates: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type BillingCycle = 'monthly' | 'annual';

const plans = {
  free: {
    id: 'free' as const,
    title: 'Free',
    description: 'Perfect for getting started',
    icon: Zap,
    price: { monthly: 0, annual: 0 },
    features: [
      '3 private repositories',
      'Basic collaboration tools',
      'Community support',
      '1GB storage',
      'Basic code analysis'
    ],
    popular: false,
    cta: 'Start Free'
  },
  'pro-monthly': {
    id: 'pro-monthly' as const,
    title: 'Pro',
    description: 'For professional developers',
    icon: Star,
    price: { monthly: 12, annual: 10 },
    features: [
      'Unlimited private repositories',
      'Advanced collaboration',
      'Priority support',
      '50GB storage',
      'Advanced code analysis',
      'Team workspaces',
      'Custom integrations'
    ],
    popular: true,
    cta: 'Start Pro Trial'
  },
  team: {
    id: 'team' as const,
    title: 'Team',
    description: 'For growing teams',
    icon: Crown,
    price: { monthly: 25, annual: 20 },
    features: [
      'Everything in Pro',
      'Advanced team management',
      'SSO authentication',
      '200GB storage per user',
      'Advanced security features',
      'Audit logs',
      'Custom branding',
      'SLA support'
    ],
    popular: false,
    cta: 'Start Team Trial'
  }
};

export const PlanSelectionStep: React.FC<PlanSelectionStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const handlePlanSelect = (planId: typeof data.plan) => {
    if (planId === 'pro-monthly' || planId === 'pro-annual') {
      onUpdate({ plan: billingCycle === 'annual' ? 'pro-annual' : 'pro-monthly' });
    } else {
      onUpdate({ plan: planId });
    }
  };

  const handleContinue = () => {
    if (data.plan) {
      onNext();
    }
  };

  const handleSkip = () => {
    onUpdate({ plan: 'free' });
    onNext();
  };

  const getSelectedPlan = () => {
    if (data.plan === 'pro-monthly' || data.plan === 'pro-annual') {
      return 'pro-monthly';
    }
    return data.plan;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          Choose your plan
        </h3>
        <p className="text-muted-foreground">
          Start with a free account and upgrade anytime
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${billingCycle === 'monthly' ? 'text-card-foreground font-medium' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            billingCycle === 'annual' ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${billingCycle === 'annual' ? 'text-card-foreground font-medium' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded">
            Save 20%
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-3">
        {Object.values(plans).map((plan) => {
          const Icon = plan.icon;
          const isSelected = getSelectedPlan() === plan.id;
          const price = plan.price[billingCycle];
          const showPrice = plan.id !== 'free';
          
          return (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`relative p-5 border-2 rounded-xl cursor-pointer transition-all group hover:border-primary/50 ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-card'
                  : 'border-border hover:bg-muted/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 left-5 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-card-foreground">{plan.title}</h4>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
                
                {showPrice && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-card-foreground">
                      ${price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per user/{billingCycle === 'monthly' ? 'month' : 'year'}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${
                      isSelected ? 'text-primary' : 'text-success'
                    }`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Radio button indicator */}
              <div className={`absolute top-5 right-5 w-4 h-4 border-2 rounded-full transition-all ${
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

      {/* Free Trial Notice */}
      {data.plan && data.plan !== 'free' && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-center">
            🎉 <strong>14-day free trial</strong> included! No credit card required.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
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
            disabled={!data.plan}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={handleSkip}
          className="w-full text-sm text-muted-foreground hover:text-card-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};