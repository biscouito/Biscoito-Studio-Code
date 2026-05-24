import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'font-medium transition-colors duration-200 rounded'
  const variantClasses = {
    primary: 'bg-biscoito-accent text-white hover:bg-blue-600',
    secondary: 'bg-biscoito-bg text-biscoito-text hover:bg-biscoito-hover',
    ghost: 'hover:bg-biscoito-hover text-biscoito-text',
  }
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  }

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
