import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { SignupFormData } from '../SignupStepper';
import axios from 'axios';

interface SuccessStepProps {
  data: SignupFormData;
  onComplete: () => void;
}

// Placeholder API function


export const SuccessStep: React.FC<SuccessStepProps> = ({ data, onComplete }) => {
  const [isCreating, setIsCreating] = useState(true);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState('');

  const createAccount = async (data: SignupFormData) => {
    try {
      await axios.post('/api/auth/register', data)
        .then((response) => {
          if (response.status === 201) {
            setCreated(true);
            console.log('Account created successfully', response.data);
          } else {
            setError(response.data.error || 'Account creation failed');
          }
        })
        .catch(() => {
          setError('Something went wrong. Please try again.');
        })
        .finally(() => {
          setIsCreating(false);
        });
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
  };

  useEffect(() => {
    console.log(data)
    createAccount(data)

  }, [data]);

  const getPlanName = () => {
    switch (data.plan) {
      case 'free':
        return 'Free Plan';
      case 'pro-monthly':
        return 'Pro Plan (Monthly)';
      case 'pro-annual':
        return 'Pro Plan (Annual)';
      case 'team':
        return 'Team Plan';
      default:
        return 'Free Plan';
    }
  };

  const getRoleName = () => {
    switch (data.role) {
      case 'personal':
        return 'Personal';
      case 'professional':
        return 'Professional';
      case 'team':
        return 'Team';
      default:
        return 'Personal';
    }
  };

  if (error) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-destructive rounded-full" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            Something went wrong
          </h3>
          <p className="text-muted-foreground">{error}</p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-colors shadow-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 mx-auto">
          <div className="w-full h-full border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            Creating your account...
          </h3>
          <p className="text-muted-foreground">
            Setting up your CodeEditor workspace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
        <div className="relative w-full h-full bg-success rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-success-foreground" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-xl font-bold text-card-foreground">
            Welcome to CodeEditor!
          </h3>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Your account has been successfully created. You're ready to start coding!
        </p>
      </div>

      {/* Account Summary */}
      <div className="p-4 bg-muted/30 rounded-lg space-y-3">
        <h4 className="font-semibold text-card-foreground">Account Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="text-card-foreground font-medium">{data.fullname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="text-card-foreground font-medium">{data.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role:</span>
            <span className="text-card-foreground font-medium">{getRoleName()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plan:</span>
            <span className="text-card-foreground font-medium">{getPlanName()}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-left">
        <h4 className="font-semibold text-card-foreground mb-2">What's next?</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Create your first repository</li>
          <li>• Invite team members (if applicable)</li>
          <li>• Explore our code collaboration features</li>
          <li>• Check out our getting started guide</li>
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-all shadow-button"
      >
        Get Started with CodeEditor
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Additional Links */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <a href="#" className="text-primary hover:text-primary-glow transition-colors">
          Download Desktop App
        </a>
        <span className="text-muted-foreground">•</span>
        <a href="#" className="text-primary hover:text-primary-glow transition-colors">
          View Documentation
        </a>
      </div>
    </div>
  );
};