import React from 'react';

/**
 * Reusable Button component with semantic variants and pill-shaped styling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'primary' | 'secondary' | 'outline' | 'inverted'} [props.variant='primary']
 * @param {string} [props.className='']
 * @param {function} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {boolean} [props.disabled=false]
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none px-6 py-3 text-sm md:text-base active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm hover:shadow-md',
    secondary: 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-sm hover:shadow-md',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    inverted: 'bg-white text-brand-primary hover:bg-surface-light shadow-sm hover:shadow-md',
  };

  const selectedVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
