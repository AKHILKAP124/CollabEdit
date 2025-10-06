import React, { useState, forwardRef, useEffect } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { SocialButton } from './SocialButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/UserSlice';

interface LoginFormProps {
  onSuccess: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Placeholder API function
const loginUser = async (data: LoginData): Promise<{ success: boolean; error?: string, user: object }> => {

  return new Promise((resolve) => {
  try {
    axios.post(`/api/auth/login`, data).then(response => {
      console.log('Login response:', response);
      if (response?.data?.success) {
        toast.success('Login successful');
        localStorage.setItem('accessToken', response?.data?.data?.accessToken);
        resolve({ success: true, user: response?.data?.data?.user });
      } else {
        resolve({ success: false, user: null, error: response.data.message || 'Login failed' });
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
    }
  });
};

export const LoginForm = forwardRef<HTMLInputElement, LoginFormProps>(({ onSuccess }, ref) => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rememberMeRef = React.useRef<HTMLInputElement>(null);


  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (remembered) {
      setFormData(JSON.parse(remembered));
      rememberMeRef.current!.checked = true;
    }
  }, []);

 

  const validateField = (name: keyof LoginData, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        break;
      case 'password':
        if (!value) return 'Password is required';
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: LoginErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof LoginData, value);
      if (error) newErrors[key as keyof LoginErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await loginUser(formData);
      if (result.success) {
        onSuccess();
        const loginData = {
          isLoggedIn: true,
          user: result?.user
        }
        dispatch(login(loginData));
        navigate('/dashboard');
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(formData));
        }
      } else {
        setErrors({ general: result.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Social Login */}
      <div className="space-y-3">
        <SocialButton
          provider="google"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        />
        <SocialButton
          provider="github"
          onClick={() => handleSocialLogin('github')}
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
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
            {errors.general}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
            Email or Username
          </label>
          <input
            ref={ref}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-input text-sm border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
              errors.email ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
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
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 pr-12 bg-input text-sm border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                errors.password ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
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
          {errors.password && (
            <p id="password-error" className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input ref={rememberMeRef} type="checkbox" className="rounded border-border" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(true)} />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <button
            type="button"
            className="text-primary hover:text-primary-glow transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Sign In
        </button>
      </form>
    </div>
  );
});