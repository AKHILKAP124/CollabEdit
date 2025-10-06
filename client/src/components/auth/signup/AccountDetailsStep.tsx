import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Check, X, Loader2 } from 'lucide-react';
import { SignupFormData } from '../SignupStepper';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ClearOTP, SetOTP } from '@/redux/slices/UserSlice';
import { toast } from 'sonner';

interface AccountDetailsStepProps {
  data: SignupFormData;
  onUpdate: (updates: Partial<SignupFormData>) => void;
  onNext: () => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const passwordRequirements = [
  { id: 'length', label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
];

// Placeholder API functions
const checkEmailAvailability = async (email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate some emails being taken
      const takenEmails = ['test@example.com', 'admin@codeeditor.com'];
      resolve(!takenEmails.includes(email));
    }, 800);
  });
};

const sendOtp = async (email: string, otp: string): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    console.log(`Sending OTP ${otp} to email: ${email}`);
    try {
      axios.post('/api/send-otp', { toEmail: email, otp: otp })
        .then(response => {
        if (response.data.success) {
          resolve({ success: true })
        }
      })
    } catch (error) {
      resolve({ success: false, error: 'Failed to send OTP' });
    }
  });
};

const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const AccountDetailsStep = forwardRef<HTMLInputElement, AccountDetailsStepProps>(
  ({ data, onUpdate, onNext }, ref) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailChecking, setEmailChecking] = useState(false);

    const dispatch = useDispatch();

    const validateField = (fullname: keyof SignupFormData, value): string | undefined => {
      switch (fullname) {
        case 'fullname':
          if (!value || value.length < 2) return 'Name must be at least 2 characters';
          break;
        case 'email':
          if (!value) return 'Email is required';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
          break;
        case 'password':
          if (!value) return 'Password is required';
          if (value.length < 8) return 'Password must be at least 8 characters';
          break;
        case 'confirmPassword':
          if (!value) return 'Please confirm your password';
          if (value !== data.password) return 'Passwords do not match';
          break;
        case 'acceptTerms':
          if (!value) return 'You must accept the terms and conditions';
          break;
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;

      onUpdate({ [name]: newValue });

      // Clear field error on change
      if (errors[name as keyof ValidationErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }

      // Check email availability
      if (name === 'email' && value && !errors.email) {
        setEmailChecking(true);
        checkEmailAvailability(value).then((available) => {
          setEmailChecking(false);
          if (!available) {
            setErrors(prev => ({ ...prev, email: 'This email is already registered' }));
          }
        });
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      const newErrors: ValidationErrors = {};
      const fieldsToValidate: (keyof SignupFormData)[] = ['fullname', 'email', 'password', 'confirmPassword', 'acceptTerms'];

      fieldsToValidate.forEach(field => {
        const error = validateField(field, data[field]);
        if (error) newErrors[field as keyof ValidationErrors] = error;
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);

      try {
        const otp = generateOtp();
        dispatch(SetOTP(otp));
        const result = await sendOtp(data.email, otp);
        if (result.success) {
          toast.success('OTP sent successfully');
          onNext();
        } else {
          setErrors({ email: result.error || 'Failed to send OTP' });
          dispatch(ClearOTP());
        }
      } catch (error) {
        setErrors({ email: 'Something went wrong. Please try again.' });
        dispatch(ClearOTP());
      } finally {
        setIsLoading(false);
      }
    };

    

    const getPasswordStrength = () => {
      const metRequirements = passwordRequirements.filter(req => req.test(data.password));
      return (metRequirements.length / passwordRequirements.length) * 100;
    };

    const getPasswordStrengthColor = () => {
      const strength = getPasswordStrength();
      if (strength < 50) return 'bg-destructive';
      if (strength < 75) return 'bg-warning';
      return 'bg-success';
    };

    return (
      <div className="space-y-6">
        {/* Social Signup */}
        {/* <div className="space-y-3">
          <SocialButton
            provider="google"
            onClick={() => handleSocialSignup('google')}
            disabled={isLoading}
          />
          <SocialButton
            provider="github"
            onClick={() => handleSocialSignup('github')}
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">or continue with email</span>
          </div>
        </div> */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
              Full Name
            </label>
            <input
              ref={ref}
              id="fullname"
              name="fullname"
              type="text"
              value={data.fullname}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 text-sm bg-input border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.name ? 'border-destructive' : 'border-border'
                }`}
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-sm pr-12 bg-input border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.email ? 'border-destructive' : 'border-border'
                  }`}
                placeholder="Enter your email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {emailChecking && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-card-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-sm pr-12 bg-input border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.password ? 'border-destructive' : 'border-border'
                  }`}
                placeholder="Create a password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : 'password-requirements'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-card-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength */}
            {data.password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${getPasswordStrength()}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {getPasswordStrength() < 50 ? 'Weak' : getPasswordStrength() < 75 ? 'Good' : 'Strong'}
                  </span>
                </div>

                <div id="password-requirements" className="grid grid-cols-2 gap-1 text-xs">
                  {passwordRequirements.map(req => (
                    <div key={req.id} className="flex items-center gap-1">
                      {req.test(data.password) ? (
                        <Check className="w-3 h-3 text-success" />
                      ) : (
                        <X className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className={req.test(data.password) ? 'text-success' : 'text-muted-foreground'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={data.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-sm pr-12 bg-input border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.confirmPassword ? 'border-destructive' : 'border-border'
                  }`}
                placeholder="Confirm your password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-card-foreground transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={data.acceptTerms}
                onChange={handleInputChange}
                className="mt-0.5 rounded border-border focus:ring-ring"
                aria-describedby={errors.acceptTerms ? 'terms-error' : undefined}
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary-glow transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary-glow transition-colors">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p id="terms-error" className="text-sm text-destructive">{errors.acceptTerms}</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            We'll never share your email. By continuing you agree to our Terms and Privacy Policy.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Send OTP
          </button>
        </form>
      </div>
    );
  }
);