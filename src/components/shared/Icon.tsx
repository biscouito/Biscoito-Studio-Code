import React from 'react'
import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: number
  className?: string
  onClick?: () => void
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 16, className = '', onClick }) => {
  return (
    <IconComponent
      size={size}
      className={`inline-block ${className}`}
      onClick={onClick}
    />
  )
}

export default Icon
