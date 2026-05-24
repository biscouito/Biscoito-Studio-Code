import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-biscoito-text">{label}</label>}
      <input
        className={clsx(
          'px-3 py-2 bg-biscoito-bg border border-biscoito-border rounded',
          'text-biscoito-text placeholder-biscoito-text-dim',
          'focus:outline-none focus:ring-2 focus:ring-biscoito-accent',
          'transition-colors duration-200',
          error && 'border-biscoito-error',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-biscoito-error">{error}</span>}
    </div>
  )
}

export default Input
