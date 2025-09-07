import React, { useState, useEffect, useRef } from 'react';
import { X, Moon, Sun } from 'lucide-react';
import { LoginForm } from './auth/LoginForm';
import { SignupStepper } from './auth/SignupStepper';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login'
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Click outside handler
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-modal-overlay animate-fade-in backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md mx-4 bg-card rounded-2xl shadow-modal animate-scale-in transform transition-all duration-300 max-h-[90vh] overflow-hidden md:max-w-2xl md:mx-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h1 id="modal-title" className="text-lg md:text-xl font-semibold text-card-foreground">
              {activeTab === 'login' ? 'Sign in to CollabEdit' : 'Create your CollabEdit account'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-primary border-b-2 border-primary bg-muted/30'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'signup'
                ? 'text-primary border-b-2 border-primary bg-muted/30'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'login' ? (
            <LoginForm ref={firstInputRef} onSuccess={onClose} />
          ) : (
            <SignupStepper ref={firstInputRef} onSuccess={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;