'use client';

import type { ReactNode, MouseEventHandler } from 'react';

interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  className?: string;
}

const variantStyles = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(30,58,95,0.3)] transition-shadow',
  secondary: 'border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary/5',
  accent: 'bg-amber-500 text-white font-bold hover:bg-amber-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

export default function ActionButton({
  variant = 'primary',
  children,
  loading,
  disabled,
  onClick,
  type = 'button',
  className = '',
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`rounded-lg px-6 py-3 min-h-12 font-medium transition-all duration-200 w-full active:scale-[0.97]
        ${variantStyles[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Procesando...
        </span>
      ) : children}
    </button>
  );
}
