import React, { useState, useRef, useEffect } from 'react';
import { Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import { SignupFormData } from '../SignupStepper';

interface OtpVerificationStepProps {
  email: string;
  data: SignupFormData;
  onUpdate: (updates: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Placeholder API function
const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo, accept "123456" as valid OTP
      if (otp === '123456') {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: 'Invalid OTP code' });
      }
    }, 1500);
  });
};

const resendOtp = async (email: string): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export const OtpVerificationStep: React.FC<OtpVerificationStepProps> = ({
  email,
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize cooldown
  useEffect(() => {
    setResendCooldown(60); // 60 seconds cooldown
  }, []);

  // Handle cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6);
      const newValues = [...otpValues];
      for (let i = 0; i < pastedValue.length && i + index < 6; i++) {
        newValues[index + i] = pastedValue[i];
      }
      setOtpValues(newValues);
      
      // Focus last filled input
      const lastFilledIndex = Math.min(index + pastedValue.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
      
      // Clear error
      setError('');
      
      // Update form data
      onUpdate({ otp: newValues.join('') });
      return;
    }

    // Single character input
    if (/^\d?$/.test(value)) {
      const newValues = [...otpValues];
      newValues[index] = value;
      setOtpValues(newValues);
      
      // Move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      
      // Clear error
      setError('');
      
      // Update form data
      onUpdate({ otp: newValues.join('') });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otpValues.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await verifyOtp(email, otpString);
      
      if (result.success) {
        onNext();
      } else {
        setError(result.error || 'Invalid OTP code');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    
    setResendLoading(true);
    
    try {
      const result = await resendOtp(email);
      if (result.success) {
        setResendCooldown(60);
        setOtpValues(['', '', '', '', '', '']);
        setError('');
        onUpdate({ otp: '' });
        // Focus first input
        inputRefs.current[0]?.focus();
      } else {
        setError(result.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          Check your email
        </h3>
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>
        <p className="font-medium text-card-foreground">{email}</p>
        <p className="text-sm text-muted-foreground">
          Enter the code below to verify your email address.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex gap-3 justify-center">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-lg font-semibold bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                  error ? 'border-destructive' : 'border-border'
                }`}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        {/* Resend */}
        <div className="text-center">
          {resendCooldown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend code in {resendCooldown}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="text-sm text-primary hover:text-primary-glow transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {resendLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Resend OTP
            </button>
          )}
        </div>

        {/* Demo Helper */}
        <div className="p-3 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Demo:</strong> Use code <code className="px-1 py-0.5 bg-muted rounded text-xs">123456</code> to continue
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
            type="submit"
            disabled={isLoading || otpValues.join('').length !== 6}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Verify Email
          </button>
        </div>
      </form>
    </div>
  );
};